import { Module } from '@nestjs/common';
// import { UsersModule } from './modules/users/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    // UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
