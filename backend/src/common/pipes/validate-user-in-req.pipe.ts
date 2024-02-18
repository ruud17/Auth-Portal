import { PipeTransform, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value.user) {
      throw new UnauthorizedException();
    }
    return value.user;
  }
}
