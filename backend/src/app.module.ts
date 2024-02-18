import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE, APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AllExceptionsFilter } from 'common/filters/all-exception.filter';
import { UsersModule } from 'modules/users/users.module';
import { AuthModule } from 'modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { validate } from './config/config-validation';
import { RegisterModule } from './modules/register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    RegisterModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE, // apply ValidationPipe on all routes
      useFactory: () => {
        return new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
          exceptionFactory: (errors) => {
            const messages = errors.map((error) => Object.values(error.constraints));
            return new BadRequestException(messages.flat());
          },
        });
      },
    },
    {
      provide: APP_FILTER, // apply global filter (AllExceptionsFilter) on all API endpoints
      useFactory: (httpAdapterHost: HttpAdapterHost) => {
        return new AllExceptionsFilter(httpAdapterHost);
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'cats', method: RequestMethod.GET });
//   }
// }
