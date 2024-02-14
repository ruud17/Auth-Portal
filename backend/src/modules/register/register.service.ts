import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client, User } from 'modules/users/entities/user.entity';
import { Photo } from 'modules/users/entities/photo.entity';
import { PasswordHelper } from 'common/password.helper';
import { AwsService } from 'common/services/aws.service';
import { DEFAULT_AVATAR_URL } from 'common/constants/constants';
import { RegisterClientDto } from './dto/register-client.dto';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly awsService: AwsService
    ) { }

    async addClient(
        registerDto: RegisterClientDto,
        photosList: Array<Express.Multer.File>,
    ): Promise<Client> {
        const hashedPassword = await PasswordHelper.hashPassword(registerDto.password);
        const avatarUrl = registerDto.avatar || DEFAULT_AVATAR_URL;

        try {
            const photoEntities = await this.uploadPhotosToS3AndReturnEntities(photosList);

            return await this.userRepository.manager.transaction(async entityManager => {
                const newUserData = {
                    ...registerDto,
                    avatar: avatarUrl,
                    password: hashedPassword,
                    photos: photoEntities,
                    type: 'Client',
                };
                const newUser = entityManager.create(User, newUserData) as Client;
                return await entityManager.save(User, newUser);
            });

        } catch (error) {
            throw error;
        }
    }

    private async uploadPhotosToS3AndReturnEntities(photosList: Express.Multer.File[]): Promise<Photo[]> {
        return Promise.all(photosList.map(async file => {
            const { fileName, url } = await this.awsService.uploadFileAndGetDetails(file);
            return { name: fileName, url } as Photo;
        }));
    }
}
