import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import { ENV_DEVELOPMENT } from 'common/constants/constants';
import { WinstonLoggerService } from './winston-logger.service';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transports:
          configService.get<string>('NODE_ENV') === ENV_DEVELOPMENT
            ? [
                new winston.transports.Console({
                  format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    nestWinstonModuleUtilities.format.nestLike(),
                  ),
                }),
              ]
            : [
                // TO DO: adjust to Production setup using AWS CloudWatch
                // here is sample how to setup AWS CloudWatch (install package before configuring)
                // new WinstonCloudWatch({
                //   logGroupName: configService.get<string>('CLOUDWATCH_LOG_GROUP_NAME'),
                //   logStreamName: configService.get<string>('CLOUDWATCH_LOG_STREAM_NAME'),
                //   awsAccessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
                //   awsSecretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
                //   awsRegion: configService.get<string>('AWS_REGION'),
                //   format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                // }),
              ],
      }),
    }),
  ],
  exports: [WinstonLoggerService],
  providers: [WinstonLoggerService],
})
export class WinstonLoggerModule {}
