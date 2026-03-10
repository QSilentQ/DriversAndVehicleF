using Goods.Domain.Products;
using Goods.Services.Products.Repositories.Converters;
using Goods.Services.Products.Repositories.Interfaces;
using Goods.Services.Products.Repositories.Models;
using Goods.Services.Products.Repositories.Queries;
using Goods.Tools.Utils;
using static Goods.Tools.Utils.NumberUtils;

namespace Goods.Services.Products.Repositories;

public class ProductsRepository : IProductsRepository
{
	public void SaveProduct(ProductBlank productBlank)
	{
		DatabaseUtils.Execute(
			Sql.ProductSave,
			(parameters) =>
			{
				parameters.AddWithValue("p_id", productBlank.Id!.Value);
				parameters.AddWithValue("p_category", (Int32)productBlank.Category!);
				parameters.AddWithValue("p_name", productBlank.Name!);
				parameters.AddWithValue("p_description", (Object?)productBlank.Description ?? DBNull.Value);
				parameters.AddWithValue("p_price", productBlank.Price!);
				parameters.AddWithValue("p_currentDateTimeUtc", DateTime.UtcNow);
			}
		);
	}

	public Page<Product> GetProductsPage(Int32 page, Int32 countInPage)
	{
		(Int32 offset, Int32 limit) = NormalizeRange(page, countInPage);

		return DatabaseUtils
			.GetPage(
				Sql.GetProductsPage,
				(parameters) =>
				{
					parameters.AddWithValue("@p_offset", offset);
					parameters.AddWithValue("@p_limit", limit);
				},
				(reader) => reader.ToProductDb()
			)
			.Convert(productDb => productDb.ToProduct());
	}

	public Product? GetProduct(Guid productId)
	{
		return DatabaseUtils
			.Get<ProductDb?>(
				Sql.GetProductById,
				(parameters) =>
				{
					parameters.AddWithValue("@p_productId", productId);
				},
				(reader) => reader.ToProductDb()
			)
			?.ToProduct();
	}

	public void MarkProductAsRemoved(Guid productId)
	{
		DatabaseUtils.Execute(
			Sql.MarkProductAsRemoved,
			(parameters) =>
			{
				parameters.AddWithValue("p_productId", productId);
				parameters.AddWithValue("p_currentDateTimeUtc", DateTime.UtcNow);
			}
		);
	}
}
