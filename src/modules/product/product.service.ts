import { HydratedDocument, Query } from 'mongoose';
import { DeleteProductDto, UpdateProductDto } from './product.dto';
import Product, { IProduct, ProductBody } from './product.model';

export function createProduct(input: ProductBody): HydratedDocument<IProduct> {
  return new Product(input);
}

export function getProductById(
  id: string
): Query<HydratedDocument<IProduct> | null, HydratedDocument<IProduct>> {
  return Product.findById(id);
}

export function getProductList(): Query<IProduct[], IProduct> {
  return Product.find();
}

export function updateProduct(
  id: UpdateProductDto['params']['id'],
  product: UpdateProductDto['body']
): Query<IProduct | null, IProduct> {
  return Product.findByIdAndUpdate(id, product, { new: true });
}

export function deleteProduct(id: DeleteProductDto['params']['id']) {
  return Product.deleteOne({ _id: id });
}
