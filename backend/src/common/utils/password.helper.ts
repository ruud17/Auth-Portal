import * as bcrypt from 'bcrypt';
import { PASSWORD_HASH_ROUND_TIMES } from '../constants/constants';

export class PasswordHelper {
  static async hashPassword(pw: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(pw, PASSWORD_HASH_ROUND_TIMES);

    return hashedPassword;
  }

  static async validatePassword(plainPw: string, hashedPw: string): Promise<boolean> {
    const passwordIsValid = await bcrypt.compare(plainPw, hashedPw);

    return passwordIsValid;
  }
}
