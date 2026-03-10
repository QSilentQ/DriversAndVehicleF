namespace Goods.Tools.Types;

public readonly struct Page<T>(T[] values, Int32 totalRows)
{
	public T[] Values { get; } = values;
	public Int32 TotalRows { get; } = totalRows;

	public Page<TConverted> Convert<TConverted>(Func<T, TConverted> converter)
	{
		return new Page<TConverted>([.. Values.Select(converter)], TotalRows);
	}
}
