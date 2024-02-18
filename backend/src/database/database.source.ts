import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { ENV_DEVELOPMENT } from 'common/constants/constants';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT') || 5432,
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [
    configService.get<string>('NODE_ENV') === ENV_DEVELOPMENT
      ? 'src/modules/**/entities/*.entity.ts'
      : 'dist/modules/**/entities/*.entity.js',
  ],
  migrations: [
    configService.get<string>('NODE_ENV') === ENV_DEVELOPMENT
      ? 'src/database/migrations/*.ts'
      : 'dist/database/migrations/*.js',
  ],
  synchronize: false,
  logging: true,
};

export default new DataSource(dataSourceOptions);
