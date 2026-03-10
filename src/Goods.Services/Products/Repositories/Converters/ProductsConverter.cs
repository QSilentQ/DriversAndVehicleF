using Goods.Domain.Products;
using Goods.Domain.Products.Enums;
using Goods.Services.Products.Repositories.Models;
using Npgsql;

namespace Goods.Services.Products.Repositories.Converters;

internal static class ProductsConverter
{
	internal static Product[] ToProducts(this ProductDb[] productDbs) => [.. productDbs.Select(ToProduct)];

	internal static Product ToProduct(this ProductDb productDb)
	{
		return new Product(productDb.Id, productDb.Category, productDb.Name, productDb.Description, productDb.Price);
	}

	internal static ProductDb ToProductDb(this NpgsqlDataReader reader)
	{
		return new ProductDb(
			reader.GetGuid(reader.GetOrdinal("id")),
			(ProductCategory)reader.GetInt32(reader.GetOrdinal("category")),
			reader.GetString(reader.GetOrdinal("name")),
			reader.IsDBNull(reader.GetOrdinal("description")) ? null : reader.GetString(reader.GetOrdinal("description")),
			reader.GetDouble(reader.GetOrdinal("price")),
			reader.GetDateTime(reader.GetOrdinal("createddatetimeutc")),
			reader.IsDBNull(reader.GetOrdinal("modifieddatetimeutc"))
				? null
				: reader.GetDateTime(reader.GetOrdinal("modifieddatetimeutc")),
			reader.GetBoolean(reader.GetOrdinal("isremoved"))
		);
	}
}
