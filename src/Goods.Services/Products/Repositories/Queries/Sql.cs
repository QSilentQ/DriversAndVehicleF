namespace Goods.Services.Products.Repositories.Queries;

internal static class Sql
{
	internal static String ProductSave =>
		@"
            INSERT INTO products (
                id,
                category,
                name,
	        	description,
                price,
                createddatetimeutc,
                isremoved
            )
            VALUES (
                @p_id,
                @p_category,
                @p_name,
                @p_description,
                @p_price,
                @p_currentDateTimeUtc,
                FALSE
            )
	        ON CONFLICT (id) DO UPDATE SET
	            category = @p_category,
	        	name = @p_name,
	        	description = @p_description,
	        	price = @p_price,
	        	modifieddatetimeutc = @p_currentDateTimeUtc
        ";

	internal static String GetProductsPage =>
		@"
			SELECT COUNT(*) OVER() as count, * FROM products 
			WHERE NOT isremoved 
			ORDER BY createddatetimeutc DESC 
			OFFSET @p_offset 
			LIMIT @p_limit
		";

	internal static String GetProductById => "SELECT * FROM products WHERE id = @p_productId AND NOT isremoved";

	internal static String MarkProductAsRemoved =>
		@"
			UPDATE products
			SET isremoved = TRUE,
				modifieddatetimeutc = @p_currentDateTimeUtc
			WHERE id = @p_productId
		";
}
