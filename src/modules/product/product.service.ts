import { HydratedDocument } from 'mongoose';
import { DeleteProductDto, ProductDto, UpdateProductDto } from './product.dto';
import Product from './product.model';

export function createProduct(input: ProductDto): HydratedDocument<ProductDto> {
  return new Product(input);
}

export function getProductById(id: string) {
  return Product.findById(id);
}

export function getProductList() {
  return Product.find();
}

export function updateProduct(
  id: UpdateProductDto['params']['id'],
  product: UpdateProductDto['body']
) {
  return Product.findByIdAndUpdate(id, product, { new: true });
}

export function deleteProduct(id: DeleteProductDto['params']['id']) {
  return Product.deleteOne({ _id: id });
}
