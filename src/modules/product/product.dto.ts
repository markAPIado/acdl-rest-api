import { z } from 'zod';
import {
  createProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
  updateProductSchema
} from './product.schema';

export type CreateProductDto = z.infer<typeof createProductSchema>;

export type GetProductByIdDto = z.infer<typeof getProductByIdSchema>['params'];

export type UpdateProductDto = z.infer<typeof updateProductSchema>;

export type DeleteProductDto = z.infer<typeof deleteProductSchema>;
