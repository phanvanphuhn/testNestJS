import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model.';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return this.products;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return [product, productIndex];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ) {
    const [product, index] = this.findProduct(prodId);
    const updateProduct = { ...product };
    if (prodTitle) {
      updateProduct.title = prodTitle;
    }
    if (prodDesc) {
      updateProduct.description = prodDesc;
    }
    if (prodPrice) {
      updateProduct.price = prodPrice;
    }

    this.products[index] = updateProduct;
  }

  deleteProduct(prodId: string) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }
}
