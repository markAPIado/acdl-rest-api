import { Router } from 'express';
import { createProductHandler } from './product.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import { createProductSchema } from './product.schema';

export enum ProductRoutes {
  // ApiPath is intended to be used in the routes file
  ApiPath = '/products',
  RootPath = '/'
}

const productRouter = Router();

productRouter.post(
  ProductRoutes.RootPath,
  [validateRequest(createProductSchema)],
  createProductHandler
);

export default productRouter;
