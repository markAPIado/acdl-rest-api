import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';
import { Timestamps } from '../../shared/entities/mongoose/base.interface';
import { CreateProductDto } from './product.dto';
import { PRODUCT, PRODUCT_VALIDATION } from './product.constants';
import { USER } from '../user/user.constants';

export type ProductBody = CreateProductDto['body'] & { user: Types.ObjectId };

export interface IProduct extends Timestamps, ProductBody {}

const productSchema = new mongoose.Schema<IProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: [
        PRODUCT_VALIDATION.USER.REQUIRED.VALUE,
        PRODUCT_VALIDATION.USER.REQUIRED.MESSAGE
      ]
    },
    name: {
      type: String,
      required: [
        PRODUCT_VALIDATION.NAME.REQUIRED.VALUE,
        PRODUCT_VALIDATION.NAME.REQUIRED.MESSAGE
      ],
      maxlength: [
        PRODUCT_VALIDATION.NAME.MAX_LENGTH.VALUE,
        PRODUCT_VALIDATION.NAME.MAX_LENGTH.MESSAGE
      ],
      trim: true
    },
    description: {
      type: String,
      required: [
        PRODUCT_VALIDATION.DESCRIPTION.REQUIRED.VALUE,
        PRODUCT_VALIDATION.DESCRIPTION.REQUIRED.MESSAGE
      ],
      maxlength: [
        PRODUCT_VALIDATION.DESCRIPTION.MAX_LENGTH.VALUE,
        PRODUCT_VALIDATION.DESCRIPTION.MAX_LENGTH.MESSAGE
      ],
      trim: true
    },
    price: {
      type: Number,
      required: [
        PRODUCT_VALIDATION.PRICE.REQUIRED.VALUE,
        PRODUCT_VALIDATION.PRICE.REQUIRED.MESSAGE
      ],
      min: [
        PRODUCT_VALIDATION.PRICE.MIN_VALUE.VALUE,
        PRODUCT_VALIDATION.PRICE.MIN_VALUE.MESSAGE
      ],
      max: [
        PRODUCT_VALIDATION.PRICE.MAX_VALUE.VALUE,
        PRODUCT_VALIDATION.PRICE.MAX_VALUE.MESSAGE
      ]
    },
    quantity: {
      type: Number,
      required: [
        PRODUCT_VALIDATION.QUANTITY.REQUIRED.VALUE,
        PRODUCT_VALIDATION.QUANTITY.REQUIRED.MESSAGE
      ],
      min: [
        PRODUCT_VALIDATION.QUANTITY.MIN_VALUE.VALUE,
        PRODUCT_VALIDATION.QUANTITY.MIN_VALUE.MESSAGE
      ],
      max: [
        PRODUCT_VALIDATION.QUANTITY.MAX_VALUE.VALUE,
        PRODUCT_VALIDATION.QUANTITY.MAX_VALUE.MESSAGE
      ]
    },
    image: {
      type: String,
      required: [
        PRODUCT_VALIDATION.IMAGE.REQUIRED.VALUE,
        PRODUCT_VALIDATION.IMAGE.REQUIRED.MESSAGE
      ],
      maxlength: [
        PRODUCT_VALIDATION.IMAGE.MAX_LENGTH.VALUE,
        PRODUCT_VALIDATION.IMAGE.MAX_LENGTH.MESSAGE
      ],
      validate: {
        validator: function (v: string) {
          return validator.isURL(v);
        },
        message: 'Invalid image URL'
      }
    }
  },
  { timestamps: true }
);

productSchema.index({ name: 1, createdAt: -1 });

export const Product = mongoose.model<IProduct>(PRODUCT, productSchema);

export default Product;
