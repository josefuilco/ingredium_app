import { DataSource } from 'typeorm';
import path from 'path';
import { envs } from '../config/env.config';

const { postgres } = envs;
const entitiesDir = path.join(__dirname, '../../../**/infrastructure/persistence/entities/*.entity.{js,ts}');

export const IngrediumDataSource = new DataSource({
  type: 'postgres',
  host: postgres.host,
  port: postgres.port,
  username: postgres.user,
  password: postgres.password,
  database: postgres.database,
  poolSize: 20,
  entities: [entitiesDir],
  synchronize: postgres.development,
  logging: false
});

IngrediumDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  });