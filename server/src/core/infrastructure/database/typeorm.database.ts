import { DataSource } from 'typeorm';
import path from 'path';
import { envs } from '../config/env.config';

const { postgre } = envs;
const entitiesDir = path.join(__dirname, '../../../**/infrastructure/persistence/entities/*.entity.ts');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: postgre.host,
  port: postgre.port,
  username: postgre.user,
  password: postgre.password,
  database: postgre.database,
  poolSize: 20,
  entities: [entitiesDir],
  synchronize: postgre.development,
  logging: postgre.development
});