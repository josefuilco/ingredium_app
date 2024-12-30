import z from 'zod';
import 'dotenv/config';
import { EnviromentVariable } from '../../domain/interfaces/enviromentvariable.interface';

const enviromentVariableDto = z.object({
  PORT: z.coerce.number().int().default(3000),
  POSTGRE_HOST: z.string().nonempty(),
  POSTGRE_PORT: z.coerce.number().int().default(5432),
  POSTGRE_USER: z.string().nonempty(),
  POSTGRE_PASSWORD: z.string().nonempty(),
  POSTGRE_DATABASE: z.string().nonempty(),
  POSTGRE_DEVELOPMENT: z.coerce.boolean().default(false),
  ACCESS_SECRET: z.string().nonempty(),
  REFRESH_SECRET: z.string().nonempty(),
  RESEND_API_KEY: z.string().nonempty()
}).required();

const enviromentVariable = enviromentVariableDto.parse(process.env);

export const envs: EnviromentVariable = {
  port: enviromentVariable.PORT,
  postgre: {
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
  resend: enviromentVariable.RESEND_API_KEY
};