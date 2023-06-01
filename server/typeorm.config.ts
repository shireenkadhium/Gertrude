import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import config from './config/configuration';

dotenv.config();

const { db } = config();
console.log(db.postgres.name);

export default new DataSource({
  type: 'postgres',
  host: db.postgres.host,
  port: db.postgres.port,
  username: db.postgres.user,
  password: db.postgres.password,
  database: db.postgres.name,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
});
