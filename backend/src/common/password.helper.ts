import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  static async hashPassword(pw: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pw, saltRounds);

    return hashedPassword;
  }

  static async validatePassword(
    plainPw: string,
    hashedPw: string,
  ): Promise<boolean> {
    const passwordIsValid = await bcrypt.compare(plainPw, hashedPw);

    return passwordIsValid;
  }
}
