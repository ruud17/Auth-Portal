import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'modules/user/entities/user.entity';
import { CommonModule } from 'common/common.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommonModule],
  providers: [RegisterService],
  controllers: [RegisterController],
})
export class RegisterModule { }
