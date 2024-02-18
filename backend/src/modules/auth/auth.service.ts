import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'modules/users/users.service';
import { PasswordHelper } from 'common/password.helper';
import { LoginRequestDto } from './dto/login-request.dto';
import { API_MESSAGES } from 'common/constants/constants';
import { User } from 'modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginRequestDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.findUserByEmail(email);

    const passwordIsValid = await PasswordHelper.validatePassword(
      password,
      user.password,
    );

    if (passwordIsValid) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    throw new BadRequestException(API_MESSAGES.INVALID_CREDENTIALS);
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(API_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
  }

  // private async issueJwtToken(userId: number, email: string): Promise<string> {
  //   const payload = { sub: userId, email: email };

  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
}
