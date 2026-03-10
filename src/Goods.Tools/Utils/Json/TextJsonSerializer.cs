namespace Goods.Tools.Utils.Json;

public class TextJsonSerializer : IJsonSerializer
{
	public static JsonSerializerOptions DefaultOptions => Configure(new JsonSerializerOptions());
	public JsonSerializerOptions Options => DefaultOptions;

	public static JsonSerializerOptions Configure(JsonSerializerOptions options)
	{
		options.PropertyNameCaseInsensitive = true;
		options.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
		options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

		return options;
	}

	public TValue? Deserialize<TValue>(String json, JsonSerializerOptions? options = null)
	{
		return JsonSerializer.Deserialize<TValue>(json, options ?? Options);
	}

	public String Serialize<TValue>(TValue value, JsonSerializerOptions? options = null)
	{
		return JsonSerializer.Serialize(value, options ?? Options);
	}
}
