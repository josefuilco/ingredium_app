import { EnviromentVariable } from "../../domain/interfaces/enviromentvariable.interface";
import { ITokenProvider } from "../../domain/providers/token.provider";
import jwt from 'jsonwebtoken';
import { secretType } from "../../domain/types/secret.type";

export class JwtTokenProvider implements ITokenProvider {
  private static instance: JwtTokenProvider;
  private enviromentVariable: EnviromentVariable;

  private constructor() {}

  static getInstance(): JwtTokenProvider {
    JwtTokenProvider.instance ??= new JwtTokenProvider();
    return JwtTokenProvider.instance;
  }

  setEnviromentVariable(enviromentVariable: EnviromentVariable): void {
    if (!this.enviromentVariable)
      this.enviromentVariable = enviromentVariable;
  }

  create<T = any>(payload: T, secretType: secretType): string {
    let token: string;
    const { access, refresh } = this.enviromentVariable.secret;
    const secret = secretType === 'access' ? access : refresh;

    if (typeof payload === 'string')
      token = jwt.sign({ id: payload }, secret.content, { expiresIn: secret.expiresIn });
    else
      token = jwt.sign(JSON.stringify(payload), secret.content, { expiresIn: secret.expiresIn });

    return token;
  }
  read<T = any>(token: string, secretType: secretType): T {
    const { access, refresh } = this.enviromentVariable.secret;
    const secret = secretType === 'access' ? access : refresh;

    const payload = jwt.verify(token, secret.content);

    if (typeof payload == 'string')
      return JSON.parse(payload) as T;
    
    return payload as T;
  }
}