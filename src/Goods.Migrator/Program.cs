using Goods.Migrator;
using Goods.Services;
using Goods.Tools.Utils.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using IHost host = Host.CreateDefaultBuilder(args)
	.ConfigureServices(
		(context, serviceCollection) =>
		{
			serviceCollection.AddSingleton<IJsonSerializer>(new TextJsonSerializer());
			serviceCollection.AddServices();
		}
	)
	.UseConsoleLifetime()
	.ConfigureServices((serviceCollection) => serviceCollection.AddHostedService<Migrator>())
	.Build();

host.Run();
