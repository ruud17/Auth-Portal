import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterClientDto } from './dto/register-client.dto';
import { Client, User } from 'modules/user/entities/user.entity';
import { DEFAULT_AVATAR_URL } from 'common/constants';
import s3 from 'common/s3.bucket';
import { Photo } from 'modules/user/entities/photo.entity';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async uploadPhoto(file: Express.Multer.File): Promise<Photo> {
        const fileName = `photos/${Date.now()}_${file.originalname}`

        try {
            const uploadResult = await s3
                .upload({
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: `photos/${Date.now()}_${file.originalname}`,
                    Body: file.buffer,
                    ACL: 'public-read',
                })
                .promise();

            // Create a new Photo entity
            const photo = new Photo();
            photo.name = fileName; // The unique file name
            photo.url = uploadResult.Location; // The URL on S3

            return photo; // The file URL on S3
        } catch (error) {
            throw new Error(`Failed to upload photo to S3: ${error.message}`);
        }
    }

    async addClient(
        registerDto: RegisterClientDto,
        photosList: Array<Express.Multer.File>,
    ): Promise<Client> {
        // TO DO:
        // 1. Implement password hashing

        try {
            // Upload the photos to S3 and get their URLs
            const photos = await Promise.all(photosList.map(file => this.uploadPhoto(file)));
            console.log("PHOTO URLS:::", photos);
            // Set the photo URLs in the DTO

            if (!registerDto.avatar) {
                registerDto.avatar = DEFAULT_AVATAR_URL;
            }

            const newClient = this.userRepository.create(registerDto) as Client;
            newClient.photos = photos;

            return await this.userRepository.save(newClient);
        } catch (error) {
            // TO DO: Handle error
            console.log('error', error);
        }
    }
}
