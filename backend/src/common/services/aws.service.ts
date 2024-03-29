import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadFileResponse } from 'common/interfaces/upload-file-response.interface';
import * as AWS from 'aws-sdk';
import { API_MESSAGES } from 'common/constants/constants';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: configService.get<string>('AWS_REGION'),
    });
  }

  async uploadFileAndGetDetails(file: Express.Multer.File): Promise<UploadFileResponse> {
    const fileName = `${file.originalname}_${Date.now()}`;

    try {
      const uploadResult = await this.s3
        .upload({
          Bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
          Key: fileName,
          Body: file.buffer,
          ACL: 'public-read',
        })
        .promise();

      return {
        fileName: fileName,
        url: uploadResult.Location,
      };
    } catch (error) {
      throw new InternalServerErrorException(`${API_MESSAGES.AWS_S3_UPLOAD_ERROR}: ${file.originalname}`);
    }
  }
}
