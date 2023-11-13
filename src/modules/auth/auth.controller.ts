import { NextFunction, Request, Response } from 'express';
import { pick } from 'lodash';
import environment from '../../shared/environment';
import { generateToken } from '../../shared/security/jwt.utils';
import { AppError } from '../../shared/server/http/app-error.util';
import { HttpCode } from '../../shared/server/http/http-code.util';
import { IUser } from '../user/user.model';
import { findUser } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { HydratedDocument } from 'mongoose';

/**
 * NOTE: Record<string, never> is used to avoid passing in {} as the type
 */

export async function authHandler(
  req: Request<Record<string, never>, Record<string, never>, LoginDto['body']>,
  res: Response,
  next: NextFunction
) {
  const userExists = await findUser({ email: req.body.email });

  if (!userExists) {
    return next(new AppError('Invalid email or password', HttpCode.BadRequest));
  }

  const validPassword = userExists.comparePassword(req.body.password);

  if (!validPassword) {
    return next(new AppError('Invalid email or password', HttpCode.BadRequest));
  }

  if (!environment.jwtSecret) {
    return next(
      new AppError('JWT secret is not defined', HttpCode.InternalServerError)
    );
  }

  const payload = pick(userExists, ['name', 'email', '_id']);

  const token = generateToken<
    Pick<HydratedDocument<IUser>, 'name' | 'email' | '_id'>
  >(payload, environment.jwtSecret, {
    expiresIn: environment.jwtExpiresIn
  });

  res.json({ token });
}
