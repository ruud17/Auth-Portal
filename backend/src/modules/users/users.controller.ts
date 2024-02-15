import { Controller, Get, UnauthorizedException, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'common/guards/jwt.guard';

@Controller('api/users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @UseGuards(JwtGuard)
    @Get('me')
    async getMe(@Request() req) {
        if (!req.user) {
            throw new UnauthorizedException();
        }
        return await this.userService.getUserInfo(req.user.id);
    }
}
