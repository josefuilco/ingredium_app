import z from 'zod';
import 'dotenv/config';
import { EnviromentVariable } from '../../domain/interfaces/enviromentvariable.interface';
import path from 'path';

const enviromentVariableDto = z.object({
  PORT: z.coerce.number().int().default(3000),
  FRONTEND_ORIGIN: z.string().nonempty(),
  POSTGRE_HOST: z.string().nonempty(),
  POSTGRE_PORT: z.coerce.number().int().default(5432),
  POSTGRE_USER: z.string().nonempty(),
  POSTGRE_PASSWORD: z.string().nonempty(),
  POSTGRE_DATABASE: z.string().nonempty(),
  POSTGRE_DEVELOPMENT: z.coerce.boolean().default(false),
  ACCESS_SECRET: z.string().nonempty(),
  REFRESH_SECRET: z.string().nonempty(),
  RESEND_API_KEY: z.string().nonempty(),
  GCP_CLOUD_STORAGE_CREDENTIAL: z.string().nonempty(),
  GCP_CLOUD_STORAGE_BUCKET: z.string().nonempty(),
  HUGGINGFACE_API_KEY: z.string().nonempty(),
}).required();

const enviromentVariable = enviromentVariableDto.parse(process.env);

export const envs: EnviromentVariable = {
  port: enviromentVariable.PORT,
  frontend: enviromentVariable.FRONTEND_ORIGIN,
  postgres: {
    host: enviromentVariable.POSTGRE_HOST,
    port: enviromentVariable.POSTGRE_PORT,
    user: enviromentVariable.POSTGRE_USER,
    password: enviromentVariable.POSTGRE_PASSWORD,
    database: enviromentVariable.POSTGRE_DATABASE,
    development: enviromentVariable.POSTGRE_DEVELOPMENT
  },
  secret: {
    access: {
      content: enviromentVariable.ACCESS_SECRET,
      expiresIn: '4h'
    },
    refresh: {
      content: enviromentVariable.REFRESH_SECRET,
      expiresIn: '24h'
    }
  },
  resend: enviromentVariable.RESEND_API_KEY,
  cloudStorage: {
    credential: path.join(__dirname, '../../../../', enviromentVariable.GCP_CLOUD_STORAGE_CREDENTIAL),
    bucket: enviromentVariable.GCP_CLOUD_STORAGE_BUCKET
  },
  huggingface: enviromentVariable.HUGGINGFACE_API_KEY
};