import { z } from 'zod';
import { createProductSchema } from './product.schema';

export type ProductDto = z.infer<typeof createProductSchema>['body'];
