import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterClientDto } from './dto/register-client.dto';

@Controller('api/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    @Post()
    async register(@Body() registerClientDto: RegisterClientDto) {
        try {
            const newUser = await this.registerService.addClient(registerClientDto);
            return { message: 'User registered successfully', user: newUser };
        } catch (error) {
            return { error: error.message };
        }
    }
}
