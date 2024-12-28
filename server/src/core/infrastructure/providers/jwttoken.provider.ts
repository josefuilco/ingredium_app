import { EnviromentVariable } from "../../domain/interfaces/enviromentvariable.interface";
import { ITokenProvider } from "../../domain/providers/token.provider";
import jwt from 'jsonwebtoken';

export class JwtTokenProvider implements ITokenProvider {
  constructor(
    private readonly enviromentVariable: EnviromentVariable
  ) {}

  create<T = any>(payload: T): string {
    let token: string;
    if (typeof payload === 'string')
      token = jwt.sign(payload, this.enviromentVariable.secret.access, { expiresIn: '8h' });
    else
      token = jwt.sign(JSON.stringify(payload), this.enviromentVariable.secret.access, { expiresIn: '8h' });

    return token;
  }
  read<T = any>(token: string): T {
    const payload = jwt.verify(token, this.enviromentVariable.secret.access);
    if (typeof payload == 'string')
      return JSON.parse(payload) as T;
    
    return payload as T;
  }
}