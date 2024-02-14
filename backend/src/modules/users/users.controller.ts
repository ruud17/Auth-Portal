import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    // @Get('me')
    // getUsers() { return this.userService.getUserInfo(); }
}
