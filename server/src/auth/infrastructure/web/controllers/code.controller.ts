import { Request, Response } from 'express';
import { UserAuthenticationUseCase } from '../../../application/use-cases/userauthentication.usecase';
import { userAuthenticationDto } from '../dtos/userauthentication.dto';
import { codeAuthenticationDto } from '../dtos/codeauthentication.dto';
import { CodeAuthenticationUseCase } from '../../../application/use-cases/codeauthentication.usecase';


export class CodeController {
  constructor(
    private readonly userAuthenticationUseCase: UserAuthenticationUseCase,
    private readonly codeAuthenticationUseCase: CodeAuthenticationUseCase
  ) {}

  async authenticateUser(
    req: Request,
    res: Response
  ) {
    try {
      const cellphone = (await userAuthenticationDto.parseAsync(req.body)).cellphone;
      const isAuthenticated = await this.userAuthenticationUseCase.execute(cellphone);
      if (!isAuthenticated) {
        res.status(500).json({
          message: 'Code not created.',
          success: isAuthenticated
        });
        return;
      }
      res.status(200).json({
        message: 'Cellphone number is correct.',
        success: isAuthenticated
      });
    } catch (error) {
      if (error instanceof Error) res.status(400).json({
        message: error.message,
        success: false
      });
    }
  }

  async authenticateCode(
    req: Request,
    res: Response
  ) {
    try {
      const code = (await codeAuthenticationDto.parseAsync(req.params)).code;
      const token = await this.codeAuthenticationUseCase.execute(code);
      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(200).json({
        message: 'Identity confirmed.',
        success: true
      });
    } catch (error) {
      if (error instanceof Error) res.status(400).json({
        message: error.message,
        success: false
      });
    }
  }
}