import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'modules/users/users.service';
import { PasswordHelper } from 'common/utils/password.helper';
import { API_MESSAGES } from 'common/constants/constants';
import { User } from 'modules/users/entities/user.entity';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { WinstonLoggerService } from 'common/logger/winston-logger.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: WinstonLoggerService,
  ) {}

  async signIn(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    this.logger.logInfo(`Authentication process for user ${email} started...`, 'AuthService -> loginDto');

    try {
      const user = await this.findUserByEmail(email);
      await this.validateUserPassword(password, user.password);

      return await this.issueJwtToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      this.logger.logError(`User with ${email} does not exist in the DB!`, 'AuthService -> findUserByEmail');
      throw new BadRequestException(API_MESSAGES.INVALID_CREDENTIALS);
    }
    return user;
  }

  private async validateUserPassword(pwFromReq: string, hashedPw: string): Promise<void> {
    const passwordIsValid = await PasswordHelper.validatePassword(pwFromReq, hashedPw);
    if (!passwordIsValid) throw new BadRequestException(API_MESSAGES.INVALID_CREDENTIALS);
  }

  private async issueJwtToken(userId: number, email: string): Promise<LoginResponseDto> {
    this.logger.logInfo(`Generating JWT for user with ${email} started...`, 'AuthService -> issueJwtToken');
    const payload = { id: userId, email: email };

    try {
      const access_token = await this.jwtService.signAsync(payload);
      this.logger.logInfo(`JWT token successfully generated for ${email}!`, 'AuthService -> issueJwtToken');
      return { access_token };
    } catch (error) {
      this.logger.logError(`JWT could not be generated for user with ${email}!`, 'AuthService -> issueJwtToken', error);
      throw new InternalServerErrorException(API_MESSAGES.GENERATE_ACCESS_TOKEN_ERROR);
    }
  }
}
