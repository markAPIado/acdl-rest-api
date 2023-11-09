import { Request, Response } from 'express';
import { HttpCode } from '../../shared/server/http/http-code.util';
import { createProduct } from './product.service';

export async function createProductHandler(req: Request, res: Response) {
  const newProduct = await createProduct(req.body).save();

  return res.status(HttpCode.Created).json(newProduct);
}
