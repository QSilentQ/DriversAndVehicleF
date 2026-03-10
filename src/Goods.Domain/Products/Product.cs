using Goods.Domain.Products.Enums;

namespace Goods.Domain.Products;

public class Product(Guid id, ProductCategory category, String name, String? description, Double price)
{
	public Guid Id { get; } = id;
	public ProductCategory Category { get; } = category;
	public String Name { get; } = name;
	public String? Description { get; } = description;
	public Double Price { get; } = price;
}
