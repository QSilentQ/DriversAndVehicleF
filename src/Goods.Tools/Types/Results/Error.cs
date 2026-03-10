namespace Goods.Tools.Types.Results;

public class Error
{
	public String Message { get; }
	public String? Key { get; }

	public Error(String message)
	{
		Message = message;
	}

	public Error(String key, String message)
	{
		Key = key;
		Message = message;
	}

	public override String ToString()
	{
		return String.IsNullOrEmpty(Key) ? Message : $"({Key}) {Message}";
	}
}
