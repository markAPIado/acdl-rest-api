import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { AppError } from '../server/http/app-error.util';
import { HttpCode } from '../server/http/http-code.util';

export function validateId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    next();
  } else {
    next(new AppError('Invalid ID', HttpCode.BadRequest));
  }
}
