import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from 'common/filters/all-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable CORS
  app.enableCors();

  // apply ValidationPipe on all routes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) =>
          Object.values(error.constraints),
        );
        return new BadRequestException(messages.flat());
      },
    }),
  );

  // apply global filter for error handling
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  await app.listen(port);
}

bootstrap();
