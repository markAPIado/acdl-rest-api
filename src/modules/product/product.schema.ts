import { z } from 'zod';
import { PRODUCT_VALIDATION } from './product.constants';

const productSchema = {
  name: z
    .string()
    .max(
      PRODUCT_VALIDATION.NAME.MAX_LENGTH.VALUE,
      PRODUCT_VALIDATION.NAME.MAX_LENGTH.MESSAGE
    )
    .trim()
    .refine((value) => value !== '', PRODUCT_VALIDATION.NAME.REQUIRED.MESSAGE),
  description: z
    .string()
    .max(
      PRODUCT_VALIDATION.DESCRIPTION.MAX_LENGTH.VALUE,
      PRODUCT_VALIDATION.DESCRIPTION.MAX_LENGTH.MESSAGE
    )
    .trim()
    .refine(
      (value) => value !== '',
      PRODUCT_VALIDATION.DESCRIPTION.REQUIRED.MESSAGE
    ),
  price: z
    .number()
    .min(
      PRODUCT_VALIDATION.PRICE.MIN_VALUE.VALUE,
      PRODUCT_VALIDATION.PRICE.MIN_VALUE.MESSAGE
    )
    .max(
      PRODUCT_VALIDATION.PRICE.MAX_VALUE.VALUE,
      PRODUCT_VALIDATION.PRICE.MAX_VALUE.MESSAGE
    ),
  quantity: z
    .number()
    .min(
      PRODUCT_VALIDATION.QUANTITY.MIN_VALUE.VALUE,
      PRODUCT_VALIDATION.QUANTITY.MIN_VALUE.MESSAGE
    )
    .max(
      PRODUCT_VALIDATION.QUANTITY.MAX_VALUE.VALUE,
      PRODUCT_VALIDATION.QUANTITY.MAX_VALUE.MESSAGE
    ),
  image: z
    .string()
    .url()
    .max(
      PRODUCT_VALIDATION.IMAGE.MAX_LENGTH.VALUE,
      PRODUCT_VALIDATION.IMAGE.MAX_LENGTH.MESSAGE
    )
    .trim()
    .refine((value) => value !== '', PRODUCT_VALIDATION.IMAGE.REQUIRED.MESSAGE)
};

export const createProductSchema = z.object({
  body: z.object(productSchema)
});
