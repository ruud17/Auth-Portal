import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { API_MESSAGES } from 'common/constants/constants';
import { User } from './entities/user.entity';
import { UserResponseDto } from './dto/user-response.dto';
import { WinstonLoggerService } from 'common/logger/winston-logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly logger: WinstonLoggerService,
  ) {}

  async getUserInfo(id: number): Promise<UserResponseDto> {
    this.logger.logInfo(`Getting user with id:${id} from the DB...`, 'UsersService -> getUserInfo');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      this.logger.logInfo(`User with id: ${id} does not exist in the DB!`, 'UsersService -> getUserInfo');
      throw new NotFoundException(API_MESSAGES.USER_NOT_FOUND);
    }
    const responseDto = plainToClass(UserResponseDto, user);

    return responseDto;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
