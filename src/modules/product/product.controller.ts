import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../../shared/server/http/http-code.util';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductList,
  updateProduct
} from './product.service';
import {
  DeleteProductDto,
  GetProductByIdDto,
  UpdateProductDto
} from './product.dto';
import { AppError } from '../../shared/server/http/app-error.util';
import { RequestWithUser } from '../../shared/middlewares/auth.middleware';

export async function createProductHandler(req: Request, res: Response) {
  const requestWithUser = req as RequestWithUser;

  if (!requestWithUser.user) {
    throw new AppError('User not found', HttpCode.NotFound);
  }

  const newProduct = await createProduct({
    ...req.body,
    user: requestWithUser.user._id
  }).save();

  return res.status(HttpCode.Created).json(newProduct);
}

export async function getProductByIdHandler(
  req: Request<GetProductByIdDto['params']>,
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

export async function updateProductHandler(
  req: Request<
    UpdateProductDto['params'],
    Record<string, never>, // NOTE: <Record<string, never> is used to avoid passing in {} as the type
    UpdateProductDto['body']
  >,
  res: Response,
  next: NextFunction
) {
  const requestWithUser = req as RequestWithUser;

  const product = await getProductById(req.params.id);

  if (product?.user.toString() !== requestWithUser.user?._id) {
    return next(new AppError('Unauthorized', HttpCode.Unauthorized));
  }

  // TODO: refactor updateProduct to use updateOne instead of findByIdAndUpdate
  const updatedProduct = await updateProduct(req.params.id, req.body);

  if (!updatedProduct) {
    return next(new AppError('Product not found.', HttpCode.NotFound));
  }

  return res.status(HttpCode.Ok).json(updatedProduct);
}

export async function deleteProductHandler(
  req: Request<DeleteProductDto['params']>,
  res: Response,
  next: NextFunction
) {
  const requestWithUser = req as RequestWithUser;

  const product = await getProductById(req.params.id);

  if (product?.user.toString() !== requestWithUser.user?._id) {
    return next(new AppError('Unauthorized', HttpCode.Unauthorized));
  }

  const { deletedCount } = await deleteProduct(req.params.id);

  if (deletedCount === 0) {
    return next(new AppError('Product not found.', HttpCode.NotFound));
  }

  return res.status(HttpCode.Ok).json(deleteProduct);
}
