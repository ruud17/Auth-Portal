import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class WinstonLoggerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly winstonLogger: Logger) {}

  logInfo(message: string, context: string, additionalInfo: any = {}) {
    this.log('info', message, context, additionalInfo);
  }

  logError(message: string, context: string, trace?: string, additionalInfo: any = {}) {
    this.log('error', message, context, { ...additionalInfo, trace });
  }

  logWarn(message: string, context: string, additionalInfo: any = {}) {
    this.log('warn', message, context, additionalInfo);
  }

  logDebug(message: string, context: string, additionalInfo: any = {}) {
    this.log('debug', message, context, additionalInfo);
  }

  logVerbose(message: string, context: string, additionalInfo: any = {}) {
    this.log('verbose', message, context, additionalInfo);
  }

  private log(level: string, message: string, context: string, additionalInfo: any = {}) {
    this.winstonLogger.log({
      level,
      message,
      context,
      ...additionalInfo,
    });
  }
}
