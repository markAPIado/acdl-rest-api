import { Router } from 'express';
import {
  createProductHandler,
  getProductByIdHandler,
  getProductListHandler
} from './product.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import { createProductSchema, getProductByIdSchema } from './product.schema';
import { validateId } from '../../shared/middlewares/validate-id.middleware';

export enum ProductRoutes {
  // ApiPath is intended to be used in the routes file
  ApiPath = '/products',
  RootPath = '/',
  Id = '/:id'
}

const productRouter = Router();

productRouter.post(
  ProductRoutes.RootPath,
  [validateRequest(createProductSchema)],
  createProductHandler
);

productRouter.get(
  ProductRoutes.Id,
  [validateId, validateRequest(getProductByIdSchema)],
  getProductByIdHandler
);

productRouter.get(ProductRoutes.RootPath, getProductListHandler);

export default productRouter;
