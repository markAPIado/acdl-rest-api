import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser, findUser } from './user.service';
import { CreateUserDto } from './user.dto';
import { AppError } from '../../shared/server/http/app-error.util';
import { HttpCode } from '../../shared/server/http/http-code.util';

/**
 * NOTE: Record<string, never> is used to avoid passing in {} as the type
 */

export async function createUserHandler(
  req: Request<
    Record<string, never>,
    Record<string, never>,
    CreateUserDto['body']
  >,
  res: Response,
  next: NextFunction
) {
  const existingUser = await findUser({ email: req.body.email });

  if (existingUser) {
    return next(new AppError('User already exists', HttpCode.BadRequest));
  }

  const newUser = await createUser(req.body).save();

  const userWithoutPassword = omit(newUser.toJSON(), 'password');

  return res.status(HttpCode.Created).json(userWithoutPassword);
}
