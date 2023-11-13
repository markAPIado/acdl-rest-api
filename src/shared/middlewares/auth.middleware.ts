import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../modules/user/user.model';
import environment from '../environment';
import { VerifyTokenResultError, verifyToken } from '../security/jwt.utils';
import { AppError } from '../server/http/app-error.util';
import { HttpCode } from '../server/http/http-code.util';

export interface RequestWithUser extends Request {
  user?: Pick<HydratedDocument<IUser>, 'name' | 'email' | '_id'>;
}

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const token = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  if (!token) {
    return next(new AppError('Unauthorized', HttpCode.Unauthorized));
  }

  if (!environment.jwtSecret) {
    return next(
      new AppError('JWT secret is not defined', HttpCode.InternalServerError)
    );
  }

  const { decoded, error } = verifyToken<
    Pick<HydratedDocument<IUser>, 'name' | 'email' | '_id'>,
    VerifyTokenResultError
  >(token, environment.jwtSecret);

  if (error) {
    return next(new AppError(error.name, HttpCode.Unauthorized));
  }

  if (!decoded) {
    return next(new AppError('Unauthorized', HttpCode.Unauthorized));
  }

  const reqWithUser = req as RequestWithUser;

  reqWithUser.user = decoded;

  next();
}
