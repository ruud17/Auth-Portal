import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/users/entities/user.entity';
import { CommonModule } from 'common/common.module';
import { ValidatePhotosPipe } from 'common/pipes/validate-photos.pipe';
import { UsersModule } from 'modules/users/users.module';
import { UsersService } from 'modules/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, CommonModule],
  providers: [RegisterService, ValidatePhotosPipe, UsersService],
  controllers: [RegisterController],
})
export class RegisterModule {}
