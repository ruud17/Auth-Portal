import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      return this.authService.signIn(loginDto);
    } catch (error) {
      throw error;
    }
  }
}
