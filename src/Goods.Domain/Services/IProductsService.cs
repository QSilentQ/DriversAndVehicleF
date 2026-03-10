using Goods.Domain.Products;
using Goods.Tools.Types.Results;

namespace Goods.Domain.Services;

public interface IProductsService
{
	Result SaveProduct(ProductBlank productBlank);
	Page<Product> GetProductsPage(Int32 page, Int32 countInPage);
	Product? GetProduct(Guid productId);
	Result MarkProductAsRemoved(Guid productId);
}
