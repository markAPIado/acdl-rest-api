import { Router } from 'express';
import { authHandler } from './auth.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import { loginSchema } from './auth.schema';

export enum AuthRoutes {
  // ApiPath is intended to be used in the routes file
  ApiPath = '/auth',
  RootPath = '/'
}

const authRouter = Router();

authRouter.post(
  AuthRoutes.RootPath,
  [validateRequest(loginSchema)],
  authHandler
);

export default authRouter;
