import { Router } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductListHandler,
  updateProductHandler
} from './product.controller';
import validateRequest from '../../shared/middlewares/validate-request.middleware';
import {
  createProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
  updateProductSchema
} from './product.schema';
import { validateId } from '../../shared/middlewares/validate-id.middleware';
import { requireUser } from '../../shared/middlewares/auth.middleware';

export enum ProductRoutes {
  // ApiPath is intended to be used in the routes file
  ApiPath = '/products',
  RootPath = '/',
  Id = '/:id'
}

const productRouter = Router();

productRouter.post(
  ProductRoutes.RootPath,
  [requireUser, validateRequest(createProductSchema)],
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
  [requireUser, validateId, validateRequest(updateProductSchema)],
  updateProductHandler
);

productRouter.delete(
  ProductRoutes.Id,
  [requireUser, validateId, validateRequest(deleteProductSchema)],
  deleteProductHandler
);

export default productRouter;
