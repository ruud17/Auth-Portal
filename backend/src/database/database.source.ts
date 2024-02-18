import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

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
    process.env.NODE_ENV === 'development'
      ? 'src/modules/**/entities/*.entity.ts'
      : 'dist/modules/**/entities/*.entity.js',
  ],
  migrations: [
    process.env.NODE_ENV === 'development' ? 'src/database/migrations/*.ts' : 'dist/database/migrations/*.js',
  ],
  synchronize: false,
  logging: true,
  //   autoLoadEntities: true,
};

export default new DataSource(dataSourceOptions);
