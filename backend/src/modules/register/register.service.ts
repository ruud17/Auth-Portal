import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'modules/users/entities/user.entity';
import { Photo } from 'modules/users/entities/photo.entity';
import { UsersService } from 'modules/users/users.service';
import { PasswordHelper } from 'common/password.helper';
import { AwsService } from 'common/services/aws.service';
import { API_MESSAGES, DEFAULT_AVATAR_URL } from 'common/constants/constants';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';
import { RegisterUserDto } from './dto/register-user-response.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly awsService: AwsService,
    private readonly usersService: UsersService,
  ) {}

  async addClient(
    registerDto: RegisterUserRequestDto,
    photosList: Array<Express.Multer.File>,
  ): Promise<RegisterUserDto> {
    const avatarUrl = registerDto.avatar || DEFAULT_AVATAR_URL;
    const { email, password } = registerDto;

    try {
      await this.verifyIfEmailIsUsed(email);
      const hashedPassword = await this.hashPassword(password);

      const photoEntities =
        await this.uploadPhotosToS3AndReturnEntities(photosList);

      const createdUser = await this.userRepository.manager.transaction(
        async (entityManager) => {
          const newUserData = {
            ...registerDto,
            avatar: avatarUrl,
            password: hashedPassword,
            photos: photoEntities,
          };
          const userModel = entityManager.create(User, newUserData);
          await entityManager.save(User, userModel);
          return userModel;
        },
      );

      const responseDto = plainToClass(RegisterUserDto, createdUser);

      return responseDto;
    } catch (error) {
      throw error;
    }
  }

  private async uploadPhotosToS3AndReturnEntities(
    photosList: Express.Multer.File[],
  ): Promise<Photo[]> {
    try {
      return Promise.all(
        photosList.map(async (file) => {
          const { fileName, url } =
            await this.awsService.uploadFileAndGetDetails(file);
          return { name: fileName, url } as Photo;
        }),
      );
    } catch (error) {
      if (error.code === API_MESSAGES.AWS_S3_IVALID_PARAM) {
        throw new BadRequestException();
      } else {
        throw new InternalServerErrorException(
          API_MESSAGES.AWS_S3_UPLOAD_ERROR,
        );
      }
    }
  }

  private async verifyIfEmailIsUsed(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);
    if (user) throw new BadRequestException(API_MESSAGES.EMAIL_ALREADY_USED);
  }

  private async hashPassword(pw: string): Promise<string> {
    try {
      return await PasswordHelper.hashPassword(pw);
    } catch (error) {
      throw new InternalServerErrorException(
        API_MESSAGES.PASSWORD_HASHING_ERROR,
      );
    }
  }
}
