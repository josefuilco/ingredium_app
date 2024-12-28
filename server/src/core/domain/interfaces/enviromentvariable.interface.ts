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
    access: {
      content: string,
      expiresIn: string,
    },
    refresh: {
      content: string,
      expiresIn: string,
    }
  },
  twilio: {
    accountSid: string,
    authToken: string,
    cellphone: string
  }
}