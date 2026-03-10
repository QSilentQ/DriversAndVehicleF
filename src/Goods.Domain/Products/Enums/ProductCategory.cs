using System.ComponentModel.DataAnnotations;

namespace Goods.Domain.Products.Enums;

public enum ProductCategory
{
	[Display(Name = "Фрукты")]
	Fruits = 1,

	[Display(Name = "Овощи")]
	Vegetables = 2,

	[Display(Name = "Молочные продукты")]
	Dairy = 3,

	[Display(Name = "Мясо")]
	Meat = 4,

	[Display(Name = "Рыба и морепродукты")]
	Fish = 5,

	[Display(Name = "Хлебобулочные изделия")]
	Bakery = 6,

	[Display(Name = "Крупы и злаки")]
	Cereals = 7,
}
