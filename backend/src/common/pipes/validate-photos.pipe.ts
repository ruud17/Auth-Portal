import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { API_MESSAGES, MIN_PHOTOS_TO_UPLOAD_WHEN_REGISTERING_USER } from 'common/constants/constants';

@Injectable()
export class ValidatePhotosPipe implements PipeTransform {
  transform(photos: Array<Express.Multer.File>): Array<Express.Multer.File> {
    if (!photos || photos.length < MIN_PHOTOS_TO_UPLOAD_WHEN_REGISTERING_USER) {
      throw new BadRequestException(API_MESSAGES.PHOTOS_MINIMUM_REQUIRED);
    }
    return photos;
  }
}
