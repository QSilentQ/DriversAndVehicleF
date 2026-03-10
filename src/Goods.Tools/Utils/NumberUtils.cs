namespace Goods.Tools.Utils;

public class NumberUtils
{
	public static (Int32 offset, Int32 limit) NormalizeRange(Int32 pageNumber, Int32 countInPage)
	{
		Int32 offset = Math.Max((pageNumber - 1) * countInPage, 0);
		Int32 limit = Math.Max(countInPage, 0);

		return (offset, limit);
	}
}
