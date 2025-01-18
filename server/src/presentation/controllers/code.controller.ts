import { Request, Response } from 'express';
import { SendAuthenticationCodeUseCase } from '../../application/use-cases/sendauthenticationcode.usecase';
import { userAuthenticationDto } from '../dtos/userauthentication.dto';
import { codeAuthenticationDto } from '../dtos/codeauthentication.dto';
import { GetAccessKeyUseCase } from '../../application/use-cases/getaccesskey.usecase';


export class CodeController {
  constructor(
    private readonly sendAuthenticationCodeUseCase: SendAuthenticationCodeUseCase,
    private readonly getAccessKeyUseCase: GetAccessKeyUseCase
  ) {}

  async sendCode(
    req: Request,
    res: Response
  ) {
    try {
      const email = (await userAuthenticationDto.parseAsync(req.body)).email;
      const isSent = await this.sendAuthenticationCodeUseCase.execute(email);
      if (!isSent) {
        res.status(500).json({
          message: 'Code not created.',
          success: isSent
        });
        return;
      }
      res.status(200).json({
        message: 'Code is sent with success by email.',
        success: isSent
      });
    } catch (error) {
      if (error instanceof Error) res.status(400).json({
        message: error.message,
        success: false
      });
    }
  }

  async getAccessKey(
    req: Request,
    res: Response
  ) {
    try {
      const code = (await codeAuthenticationDto.parseAsync(req.params)).code;
      const accessKey = await this.getAccessKeyUseCase.execute(code);
      res.setHeader('Authorization', `Bearer ${accessKey}`);
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