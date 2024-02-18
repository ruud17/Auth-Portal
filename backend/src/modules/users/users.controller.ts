import { Controller, Get, UseGuards, Request, UsePipes } from '@nestjs/common';
import { JwtGuard } from 'common/guards/jwt.guard';
import { UserValidationPipe } from 'common/pipes/validate-user-in-req.pipe';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  @UsePipes(UserValidationPipe)
  async getMe(@Request() req): Promise<UserResponseDto> {
    try {
      return await this.userService.getUserInfo(req.user.id);
    } catch (error) {
      throw error;
    }
  }
}
