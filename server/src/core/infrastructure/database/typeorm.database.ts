import { DataSource } from 'typeorm';
import path from 'path';
import { envs } from '../config/env.config';

const { postgre } = envs;
const entitiesDir = path.join(__dirname, '../../../**/infrastructure/persistence/entities/*.entity.{js,ts}');

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
  logging: false
});

AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  });