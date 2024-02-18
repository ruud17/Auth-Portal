import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'modules/users/entities/user.entity';
import { Photo } from 'modules/users/entities/photo.entity';
import { UsersService } from 'modules/users/users.service';
import { PasswordHelper } from 'common/utils/password.helper';
import { AwsService } from 'common/services/aws.service';
import { API_MESSAGES, DEFAULT_AVATAR_URL } from 'common/constants/constants';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { RegisterUserDto } from './dto/register-user-response.dto';
import { WinstonLoggerService } from 'common/logger/winston-logger.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly awsService: AwsService,
    private readonly usersService: UsersService,
    private readonly logger: WinstonLoggerService,
  ) {}

  async addClient(
    registerDto: RegisterUserRequestDto,
    photosList: Array<Express.Multer.File>,
  ): Promise<RegisterUserDto> {
    const { email, password } = registerDto;
    this.logger.logInfo(`Creating new user with email ${email} started...`, 'RegisterService -> addClient');

    const avatarUrl = registerDto.avatar || DEFAULT_AVATAR_URL;

    try {
      await this.verifyIfEmailIsUsed(email);
      const hashedPassword = await this.hashPassword(password);

      const photoEntities = await this.uploadPhotosToS3(photosList);

      const createdUser = await this.userRepository.manager.transaction(async (entityManager) => {
        const newUserData = {
          ...registerDto,
          avatar: avatarUrl,
          password: hashedPassword,
          photos: photoEntities,
        };
        const userModel = entityManager.create(User, newUserData);
        await entityManager.save(User, userModel);
        return userModel;
      });

      const responseDto = plainToClass(RegisterUserDto, createdUser);

      return responseDto;
    } catch (error) {
      this.logger.logError(`Error while creating new user!`, 'RegisterService -> addClient', error);
      throw error;
    }
  }

  private async uploadPhotosToS3(photosList: Express.Multer.File[]): Promise<Photo[]> {
    try {
      this.logger.logInfo(`Uploading images to S3 started...`, 'RegisterService -> uploadPhotosToS3');
      return Promise.all(
        photosList.map(async (file) => {
          const { fileName, url } = await this.awsService.uploadFileAndGetDetails(file);
          return { name: fileName, url } as Photo;
        }),
      );
    } catch (error) {
      if (error.code === API_MESSAGES.AWS_S3_IVALID_PARAM) {
        this.logger.logError(`Invalid image format!`, 'RegisterService -> uploadPhotosToS3', error);
        throw new BadRequestException();
      } else {
        this.logger.logError(`Error while uploading images to S3!`, 'RegisterService -> uploadPhotosToS3', error);
        throw new InternalServerErrorException(API_MESSAGES.AWS_S3_UPLOAD_ERROR);
      }
    }
  }

  private async verifyIfEmailIsUsed(email: string): Promise<void> {
    this.logger.logInfo(`Checking if email ${email} is already used...`, 'RegisterService -> verifyIfEmailIsUsed');
    const user = await this.usersService.findByEmail(email);

    if (user) {
      this.logger.logError(`Email ${email} is already used!`, 'RegisterService -> verifyIfEmailIsUsed');
      throw new BadRequestException(API_MESSAGES.EMAIL_ALREADY_USED);
    }
  }

  private async hashPassword(pw: string): Promise<string> {
    try {
      this.logger.logInfo(`Hashing passowrd process started...`, 'RegisterService -> hashPassword');
      return await PasswordHelper.hashPassword(pw);
    } catch (error) {
      this.logger.logError(`Hashing password failed!`, 'RegisterService -> hashPassword', error);
      throw new InternalServerErrorException(API_MESSAGES.PASSWORD_HASHING_ERROR);
    }
  }
}
