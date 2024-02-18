import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/users/entities/user.entity';
import { UsersModule } from 'modules/users/users.module';
import { UsersService } from 'modules/users/users.service';
import { CommonModule } from 'common/common.module';
import { ValidatePhotosPipe } from 'common/pipes/validate-photos.pipe';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { WinstonLoggerModule } from 'common/logger/winston-logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, CommonModule, WinstonLoggerModule],
  providers: [RegisterService, ValidatePhotosPipe, UsersService],
  controllers: [RegisterController],
})
export class RegisterModule {}
