using Goods.Domain.Products;
using Goods.Domain.Services;
using Goods.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;

namespace Goods.BackOffice.Controllers.Products;

public class ProductsController(IProductsService productsService) : AppController
{
	[HttpPost("products/save")]
	public Result SaveProducts([FromBody] ProductBlank productBlank)
	{
		return productsService.SaveProduct(productBlank);
	}

	[HttpGet("products/get_page")]
	public Page<Product> GetProductsPage([FromQuery] Int32 page, [FromQuery] Int32 countInPage)
	{
		return productsService.GetProductsPage(page, countInPage);
	}

	[HttpGet("products/get_by_id")]
	public Product? GetProduct([FromQuery] Guid productId)
	{
		return productsService.GetProduct(productId);
	}

	[HttpGet("products/mark_product_as_removed")]
	public Result MarkProductAsRemoved([FromQuery] Guid productId)
	{
		return productsService.MarkProductAsRemoved(productId);
	}
}
