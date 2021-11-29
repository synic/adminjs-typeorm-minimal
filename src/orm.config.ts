import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Thing } from './thing.entity';

export const defaultConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [Thing],
};
