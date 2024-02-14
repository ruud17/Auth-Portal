import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'modules/users/users.service';
import { PasswordHelper } from 'common/password.helper';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);
        if (!user) throw new NotFoundException('Invalid username/password');

        const passwordIsValid = await PasswordHelper.validatePassword(password, user.password);
        console.log("Passsword valid:", passwordIsValid);

        if (passwordIsValid) {
            console.log("USAOOOO")
            const payload = { sub: user.id, email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        console.log("BACAJ ERROR");

        throw new NotFoundException('Invalid username/password');
    }

    // async generateJwtToken(userData: JwtInfo) {
    //     const payload = { sub: userData.id, email: userData.email };
    //     return {
    //         access_token: await this.jwtService.signAsync(payload),
    //     };
    // }
}
