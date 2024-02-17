import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'modules/users/entities/user.entity';
import { Photo } from 'modules/users/entities/photo.entity';
import { PasswordHelper } from 'common/password.helper';
import { AwsService } from 'common/services/aws.service';
import { API_MESSAGES, DEFAULT_AVATAR_URL } from 'common/constants/constants';
import { RegisterClientRequestDto } from './dto/register-client-request.dto';
import { plainToClass } from 'class-transformer';
import { RegisterClientResponseDto } from './dto/register-user-response.dto';
import { UsersService } from 'modules/users/users.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly awsService: AwsService,
    private readonly usersService: UsersService,
  ) {}

  async addClient(
    registerDto: RegisterClientRequestDto,
    photosList: Array<Express.Multer.File>,
  ): Promise<RegisterClientResponseDto> {
    const hashedPassword = await PasswordHelper.hashPassword(
      registerDto.password,
    );
    const avatarUrl = registerDto.avatar || DEFAULT_AVATAR_URL;

    try {
      const user = await this.usersService.findByEmail(registerDto.email);
      if (user) throw new BadRequestException(API_MESSAGES.EMAIL_ALREADY_USED);

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

      const responseDto = plainToClass(RegisterClientResponseDto, createdUser);

      return responseDto;
    } catch (error) {
      throw error;
    }
  }

  private async uploadPhotosToS3AndReturnEntities(
    photosList: Express.Multer.File[],
  ): Promise<Photo[]> {
    return Promise.all(
      photosList.map(async (file) => {
        const { fileName, url } =
          await this.awsService.uploadFileAndGetDetails(file);
        return { name: fileName, url } as Photo;
      }),
    );
  }
}
