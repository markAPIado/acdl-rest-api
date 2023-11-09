import { Router } from 'express';
import {
  createProductHandler,
  getProductByIdHandler,
  getProductListHandler,
  updateProductHandler
} from './product.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import {
  createProductSchema,
  getProductByIdSchema,
  updateProductSchema
} from './product.schema';
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

productRouter.put(
  ProductRoutes.Id,
  [validateId, validateRequest(updateProductSchema)],
  updateProductHandler
);

export default productRouter;
