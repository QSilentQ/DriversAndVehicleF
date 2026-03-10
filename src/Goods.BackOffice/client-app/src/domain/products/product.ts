import { Page } from '../../tools/types/page';
import { ProductCategory } from './enums/productCategory';

export class Product {
	constructor(
		public readonly id: string,
		public readonly category: ProductCategory,
		public readonly name: string,
		public readonly description: string,
		public readonly price: number
	) {}
}

export function mapToProductsPage(data: any): Page<Product> {
	return Page.convert(data, mapToProduct);
}

export function mapToProducts(data: any[]): Product[] {
	return data.map(mapToProduct);
}

export function mapToProduct(data: any): Product {
	return new Product(data.id, data.category, data.name, data.description, data.price);
}
