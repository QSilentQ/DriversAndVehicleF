import { ProductCategory } from './enums/productCategory';
import { Product } from './product';

export interface ProductBlank {
	id: string | null;
	category: ProductCategory | null;
	name: string | null;
	description: string | null;
	price: number | null;
}

export namespace ProductBlank {
	export function getDefault(): ProductBlank {
		return {
			id: null,
			category: null,
			name: null,
			description: null,
			price: null
		};
	}

	export function fromProduct(product: Product): ProductBlank {
		return {
			id: product.id,
			category: product.category,
			name: product.name,
			description: product.description,
			price: product.price
		};
	}
}
