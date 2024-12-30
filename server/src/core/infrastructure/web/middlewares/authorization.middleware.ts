import { NextFunction, Response } from 'express';
import { UserRequest } from '../requests/user.request';
import { JwtTokenProvider } from '../../providers/jwttoken.provider';
import { envs } from '../../config/env.config';
import { TokenNotFoundError } from '../../../domain/errors/tokennotfound.error';

const tokenProvider = JwtTokenProvider.getInstance();
tokenProvider.setEnviromentVariable(envs);

export const useAuthorization = (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new TokenNotFoundError();
    const userId = tokenProvider.read<{ id: string }>(token, 'access').id;
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: error.message,
      success: false
    });
  }
}