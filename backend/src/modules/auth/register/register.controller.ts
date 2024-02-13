import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFiles,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterClientDto } from './dto/register-client.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('api/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }

    @Post()
    @UseInterceptors(FilesInterceptor('photos'))
    async register(
        @Body() registerClientDto: RegisterClientDto,
        @UploadedFiles() photos: Array<Express.Multer.File>,
    ) {
        if (!photos || photos.length < 4) {
            throw new HttpException(
                'At least 4 photos are required',
                HttpStatus.BAD_REQUEST,
            );
        }
        try {
            const newUser = await this.registerService.addClient(
                registerClientDto,
                photos,
            );

            return { message: 'User registered successfully', user: newUser };
        } catch (error) {
            return { error: error.message };
        }
    }
}
