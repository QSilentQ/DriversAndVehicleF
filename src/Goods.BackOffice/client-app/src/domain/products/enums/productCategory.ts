export enum ProductCategory {
	Fruits = 1,
	Vegetables = 2,
	Dairy = 3,
	Meat = 4,
	Fish = 5,
	Bakery = 6,
	Cereals = 7
}

export namespace ProductCategory {
	export const getDisplayName = (category: ProductCategory): string => {
		switch (category) {
			case ProductCategory.Fruits:
				return 'Фрукты';
			case ProductCategory.Vegetables:
				return 'Овощи';
			case ProductCategory.Dairy:
				return 'Молочные продукты';
			case ProductCategory.Meat:
				return 'Мясо';
			case ProductCategory.Fish:
				return 'Рыба и морепродукты';
			case ProductCategory.Bakery:
				return 'Хлебобулочные изделия';
			case ProductCategory.Cereals:
				return 'Крупы и злаки';
		}
	};
}
