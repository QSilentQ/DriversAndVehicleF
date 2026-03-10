using Goods.Domain.Products.Enums;

namespace Goods.Services.Products.Repositories.Models;

public class ProductDb(
	Guid id,
	ProductCategory category,
	String name,
	String? description,
	Double price,
	DateTime createdDateTimeUtc,
	DateTime? modifiedDateTimeUtc,
	Boolean isRemoved
)
{
	public Guid Id { get; set; } = id;
	public ProductCategory Category { get; set; } = category;
	public String Name { get; set; } = name;
	public String? Description { get; set; } = description;
	public Double Price { get; set; } = price;

	public DateTime CreatedDateTimeUtc { get; set; } = createdDateTimeUtc;
	public DateTime? ModifiedDateTimeUtc { get; set; } = modifiedDateTimeUtc;

	public Boolean IsRemoved { get; set; } = isRemoved;
}
