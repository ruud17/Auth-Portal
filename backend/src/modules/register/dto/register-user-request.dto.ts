import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { VALIDATION_MESSAGES, passwordRegEx } from 'common/constants/constants';

export class RegisterUserRequestDto {
  @IsString({ message: VALIDATION_MESSAGES.FIRST_NAME_STRING })
  @MinLength(2, { message: VALIDATION_MESSAGES.FIRST_NAME_MIN_LENGTH })
  @MaxLength(25, { message: VALIDATION_MESSAGES.FIRST_NAME_MAX_LENGTH })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.FIRST_NAME_REQUIRED })
  firstName: string;

  @IsString({ message: VALIDATION_MESSAGES.LAST_NAME_STRING })
  @MinLength(2, { message: VALIDATION_MESSAGES.LAST_NAME_MIN_LENGTH })
  @MaxLength(25, { message: VALIDATION_MESSAGES.LAST_NAME_MAX_LENGTH })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.LAST_NAME_REQUIRED })
  lastName: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGES.EMAIL_REQUIRED })
  @IsEmail({}, { message: VALIDATION_MESSAGES.EMAIL_INCORRECT_FORMAT })
  email: string;

  @IsNotEmpty({ message: VALIDATION_MESSAGES.PASSWORD_REQUIRED })
  @Matches(passwordRegEx, {
    message: VALIDATION_MESSAGES.PASSWORD_FORMAT,
  })
  password: string;

  @IsString({ message: VALIDATION_MESSAGES.ROLE_STRING })
  @IsNotEmpty({ message: VALIDATION_MESSAGES.ROLE_REQUIRED })
  role: string;

  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @IsOptional()
  avatar: string;

  photos: Express.Multer.File[];
}
