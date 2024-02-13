import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterClientDto } from './dto/register-client.dto';
import { User } from 'modules/user/entities/user.entity';
import { DEFAULT_AVATAR_URL } from 'common/constants';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async addClient(registerDto: RegisterClientDto): Promise<User> {
        // Implement password hashing
        // upload photos to AWS S3, and save user to the database

        if (!registerDto.avatar) {
            registerDto.avatar = DEFAULT_AVATAR_URL;
        }

        const newClient = this.userRepository.create(registerDto);
        return await this.userRepository.save(newClient);
    }
}
