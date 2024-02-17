import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { API_MESSAGES } from 'common/constants/constants';

@Injectable()
export class ValidatePhotosPipe implements PipeTransform {
  transform(photos: Array<Express.Multer.File>): Array<Express.Multer.File> {
    if (!photos || photos.length < 4) {
      throw new BadRequestException(API_MESSAGES.PHOTOS_MINIMUM_REQUIRED);
    }
    return photos;
  }
}
