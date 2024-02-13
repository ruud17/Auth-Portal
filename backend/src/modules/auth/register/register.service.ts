import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterClientDto } from './dto/register-client.dto';
import { Client, User } from 'modules/user/entities/user.entity';
import { DEFAULT_AVATAR_URL } from 'common/constants';
import { Photo } from 'modules/user/entities/photo.entity';
import { PasswordHelper } from 'common/password.helper';
import { AwsService } from 'common/aws.service';

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

        if (!registerDto.avatar) {
            registerDto.avatar = DEFAULT_AVATAR_URL;
        }
        try {
            const photos = await this.uploadPhotosToS3AndReturnEntities(photosList);

            const newClient = this.userRepository.create(registerDto) as Client;
            newClient.photos = photos;
            newClient.password = await PasswordHelper.hashPassword(registerDto.password); // hash password

            return await this.userRepository.save(newClient);
        } catch (error) {
            throw new Error(`Error while registering a new client: ${registerDto.firstName} - ${registerDto.lastName}. Error: ${error}`)
        }
    }

    private async uploadPhotosToS3AndReturnEntities(photosList: Array<Express.Multer.File>): Promise<Photo[]> {
        const photoEntities: Photo[] = [];

        for (const file of photosList) {
            const { fileName, url } = await this.awsService.uploadFileAndGetDetails(file);

            const photo = new Photo();
            photo.name = fileName;
            photo.url = url;

            photoEntities.push(photo);
        }
        return photoEntities;
    }
}
