import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ValidatePhotosPipe } from 'common/pipes/validate-photos.pipe';
import { API_MESSAGES } from 'common/constants/constants';
import { RegisterService } from './register.service';
import { RegisterUserResponseDto } from './dto/register-user-response.dto';
import { RegisterUserRequestDto } from './dto/register-user-request.dto';

@Controller('api/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos'))
  @UsePipes(new ValidatePhotosPipe())
  async register(
    @Body() registerUserDto: RegisterUserRequestDto,
    @UploadedFiles() photos: Array<Express.Multer.File>,
  ): Promise<RegisterUserResponseDto> {
    try {
      const createdUser = await this.registerService.addClient(
        registerUserDto,
        photos,
      );

      return {
        message: API_MESSAGES.USER_SUCCESSFULLY_REGISTERED,
        data: createdUser,
      };
    } catch (error) {
      throw error;
    }
  }
}
