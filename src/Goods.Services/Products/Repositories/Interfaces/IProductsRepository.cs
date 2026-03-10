using Goods.Domain.Products;

namespace Goods.Services.Products.Repositories.Interfaces;

public interface IProductsRepository
{
	void SaveProduct(ProductBlank productBlank);
	Page<Product> GetProductsPage(Int32 page, Int32 countInPage);
	Product? GetProduct(Guid productId);
	void MarkProductAsRemoved(Guid productId);
}
