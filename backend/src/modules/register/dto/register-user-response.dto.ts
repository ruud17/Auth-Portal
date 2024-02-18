import { Exclude } from 'class-transformer';
import { User } from 'modules/users/entities/user.entity';

export class RegisterUserDto extends User {
  @Exclude()
  password: string;
}

export class RegisterUserResponseDto {
  message: string;
  data: RegisterUserDto;
}
