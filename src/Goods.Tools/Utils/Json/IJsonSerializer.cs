namespace Goods.Tools.Utils.Json;

public interface IJsonSerializer
{
	JsonSerializerOptions Options { get; }
	TValue? Deserialize<TValue>(String json, JsonSerializerOptions? options = null);
	String Serialize<TValue>(TValue value, JsonSerializerOptions? options = null);
}
