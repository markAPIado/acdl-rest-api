import { Express } from 'express';
import healthCheckRouter from '../modules/health-check/health-check.routes';
import errorHandler from './middlewares/error-handler.middleware';
import notFound from './middlewares/not-found.middleware';

function initRoutes(app: Express) {
  /**
   * NOTE: Add your routes here
   */

  app.use(healthCheckRouter);
  app.use(notFound);
  app.use(errorHandler);
}

export default initRoutes;
