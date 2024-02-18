import { IsNotEmpty, IsEmail } from 'class-validator';
import { VALIDATION_MESSAGES } from 'common/constants/constants';

export class LoginRequestDto {
  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INCORRECT_FORMAT })
  email: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  password: string;
}
