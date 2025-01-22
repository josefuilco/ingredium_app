import { DataSource } from 'typeorm';
import path from 'path';
import { envs } from '../config/env.config';

const { mysql } = envs;
const entitiesDir = path.join(__dirname, '../../**/infrastructure/persistence/entities/*.entity.{js,ts}');

export const IngrediumDataSource = new DataSource({
  type: 'mysql',
  host: mysql.host,
  port: mysql.port,
  username: mysql.user,
  password: mysql.password,
  database: mysql.database,
  entities: [entitiesDir],
  synchronize: mysql.development,
  logging: false
});

IngrediumDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  });