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

const passwordRegEx = /^(?=.*\d)[A-Za-z\d@$!%*?&]{6,50}$/;

export class RegisterClientRequestDto {
  @IsString({ message: 'First Name must be a string!' })
  @MinLength(2, { message: 'First Name must have at least 2 characters.' })
  @MaxLength(25, { message: 'First Name must have maximum 25 characters.' })
  @IsNotEmpty({ message: 'First Name is required!' })
  firstName: string;

  @IsString({ message: 'Last Name must be a string!' })
  @MinLength(2, { message: 'Last Name must have at least 2 characters.' })
  @MaxLength(25, { message: 'Last Name must have maximum 25 characters.' })
  @IsNotEmpty({ message: 'Last Name is required!' })
  lastName: string;

  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Please provide valid email format!' })
  email: string;

  @IsNotEmpty({ message: 'Password is required.' })
  @Matches(passwordRegEx, {
    message:
      'Password must contain min 6 and max 50 characters inlucuding 1 number!',
  })
  password: string;

  @IsString({ message: 'Role must be a string!' })
  @IsNotEmpty({ message: 'Role is required.' })
  role: string;

  @Transform(({ value }) => value === 'true', { toClassOnly: true })
  @IsBoolean()
  @IsOptional()
  active: boolean = true;

  @IsOptional()
  avatar: string;

  photos: Express.Multer.File[];
}
