import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { AppError } from '../server/http/app-error.util';
import { HttpCode } from '../server/http/http-code.util';
import { verifyToken } from '../security/jwt.utils';
import environment from '../environment';
import { CreateUserDto } from '../../modules/user/user.dto';

interface RequestWithUser extends Request {
  user: Omit<CreateUserDto['body'], 'password'>;
}

export function requireUser(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const token = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  if (!token) {
    return next(new AppError('Unauthorized', HttpCode.Unauthorized));
  }

  if (!environment.jwtSecret) {
    return next(
      new AppError('JWT secret is not defined', HttpCode.InternalServerError)
    );
  }

  const { decoded } = verifyToken<Omit<CreateUserDto['body'], 'password'>>(
    token,
    environment.jwtSecret
  );

  if (!decoded) {
    return next(new AppError('Unauthorized', HttpCode.Unauthorized));
  }

  req.user = decoded;

  next();
}
