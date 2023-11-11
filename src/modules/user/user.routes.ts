import { Router } from 'express';
import { createUserHandler } from './user.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import { createUserSchema } from './user.schema';

export enum UserRoutes {
  // ApiPath is intended to be used in the routes file
  ApiPath = '/users',
  RootPath = '/',
  Id = '/:id'
}

const userRouter = Router();

userRouter.post(
  UserRoutes.RootPath,
  [validateRequest(createUserSchema)],
  createUserHandler
);

export default userRouter;
