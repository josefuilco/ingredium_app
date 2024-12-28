export interface EnviromentVariable {
  port: number,
  postgre: {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
    development: boolean
  },
  secret: {
    access: string,
    refresh: string
  },
  twilio: {
    accountSid: string,
    authToken: string,
    cellphone: string
  }
}