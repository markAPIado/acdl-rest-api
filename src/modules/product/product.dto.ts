import { z } from 'zod';
import { createProductSchema, getProductByIdSchema } from './product.schema';

export type ProductDto = z.infer<typeof createProductSchema>['body'];

export type GetProductByIdDto = z.infer<typeof getProductByIdSchema>['params'];
