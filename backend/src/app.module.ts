import { Module } from '@nestjs/common';
// import { UsersModule } from './modules/users/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/config.validation';
import { RegisterModule } from './modules/auth/register/register.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    RegisterModule,
    // UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(LoggerMiddleware)
//       .forRoutes({ path: 'cats', method: RequestMethod.GET });
//   }
// }
