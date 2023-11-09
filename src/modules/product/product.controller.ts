import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../../shared/server/http/http-code.util';
import {
  createProduct,
  getProductById,
  getProductList
} from './product.service';
import { GetProductByIdDto } from './product.dto';
import { AppError } from '../../shared/server/http/app-error.util';

export async function createProductHandler(req: Request, res: Response) {
  const newProduct = await createProduct(req.body).save();

  return res.status(HttpCode.Created).json(newProduct);
}

export async function getProductByIdHandler(
  req: Request<GetProductByIdDto>,
  res: Response,
  next: NextFunction
) {
  const product = await getProductById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', HttpCode.NotFound));
  }

  return res.status(HttpCode.Ok).json(product);
}

export async function getProductListHandler(req: Request, res: Response) {
  const products = await getProductList();

  return res.status(HttpCode.Ok).json(products);
}
