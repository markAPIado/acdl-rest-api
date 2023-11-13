import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import morgan from 'morgan';
import environment, { Environment } from './environment';
import { logger } from './logger';
import { createRateLimit } from './security/rate-limit.utils';

function initMiddlewares(app: Express) {
  app.use(helmet());

  app.use(
    cors({
      origin: function (origin, callback) {
        if (
          !origin ||
          environment.corsOrigin === '*' ||
          environment.corsOrigin?.split(',').indexOf(origin) !== -1
        ) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: false // NOTE: Set this to true if you need to use cookies with CORS
    })
  );

  /**
   * NOTE: This enables the rate limit for all the routes. You can enable it for specific routes. Check the session.routes.ts file.
   */
  app.use(createRateLimit({ max: 100, minutes: 60 }));

  app.use(compression());

  /**
   * NOTE: Change the limit to your needs. You cam implement limit per route.
   * Example: app.post('/api/users', express.json({ limit: '10kb' }), createUserHandler);
   */
  app.use(express.json({ limit: '10kb' }));

  app.use(express.urlencoded({ extended: true }));

  /**
   * NOTE: This is a security middleware that removes all the MongoDB operators from the request query, body, and params.
   * This prevents MongoDB Operator Injection. Example of a MongoDB operator: $gt, $gte, $lt, $lte, $in, $nin, etc.
   */
  app.use(mongoSanitize());

  /**
   * NOTE: You can enable morgan for specific environments. Check the environment.ts file. But, it is recommended to enable it only for development.
   */
  if (
    environment.nodeEnv === Environment.Development ||
    environment.morganEnabled
  ) {
    app.use(morgan('dev'));
    logger.info('Morgan enabled...');
  }
}

export default initMiddlewares;
