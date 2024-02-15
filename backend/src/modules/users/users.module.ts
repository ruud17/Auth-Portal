import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { JwtGuard } from 'common/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, JwtGuard, JwtService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }
