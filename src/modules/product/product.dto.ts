import { z } from 'zod';
import {
  createProductSchema,
  getProductByIdSchema,
  updateProductSchema
} from './product.schema';

export type ProductDto = z.infer<typeof createProductSchema>['body'];

export type GetProductByIdDto = z.infer<typeof getProductByIdSchema>['params'];

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
