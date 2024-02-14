import { Controller, Request, Post, UseGuards, Body, NotFoundException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            return this.authService.signIn(loginDto);
        } catch (error) {
            console.log("ULETIO U CATCHHHH")
            throw error;
        }
    }
}
