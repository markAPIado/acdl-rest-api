import { Express } from 'express';
import healthCheckRouter from '../modules/health-check/health-check.routes';
import errorHandler from './middlewares/error-handler.middleware';
import notFound from './middlewares/not-found.middleware';
import productRouter, {
  ProductRoutes
} from '../modules/product/product.routes';
import userRouter, { UserRoutes } from '../modules/user/user.routes';
import authRouter, { AuthRoutes } from '../modules/auth/auth.routes';

const API_PREFIX = '/v1/api';

function initRoutes(app: Express) {
  /**
   * NOTE: Add your routes here
   */

  app.use(`${API_PREFIX}${UserRoutes.ApiPath}`, userRouter);
  app.use(`${API_PREFIX}${AuthRoutes.ApiPath}`, authRouter);
  app.use(`${API_PREFIX}${ProductRoutes.ApiPath}`, productRouter);

  /**
   * Below are the default routes for the application. Do not remove them.
   */
  app.use(healthCheckRouter);
  app.use(notFound);
  app.use(errorHandler);
}

export default initRoutes;
