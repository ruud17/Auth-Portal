import { RegisterUserDto } from 'modules/register/dto/register-user-response.dto';

export class UserResponseDto extends RegisterUserDto {
  avatar: string;
}
