export interface EnviromentVariable {
  port: number,
  frontend: string,
  postgre: {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
    development: boolean
  },
  secret: {
    access: {
      content: string,
      expiresIn: string,
    },
    refresh: {
      content: string,
      expiresIn: string,
    }
  },
  resend: string;
  cloudStorage: {
    credential: string;
    bucket: string;
  },
  huggingface: string;
}