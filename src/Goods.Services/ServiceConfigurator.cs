using Goods.Domain.Services;
using Goods.Services.Drivers;
using Goods.Services.Drivers.Repositories;
using Goods.Services.Drivers.Repositories.Interfaces;
using Goods.Services.Histories;
using Goods.Services.Histories.Repositories;
using Goods.Services.Histories.Repositories.Interfaces;
using Goods.Services.Vehicles;
using Goods.Services.Vehicles.Repositories;
using Goods.Services.Vehicles.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Goods.Services;

public static class ServiceConfigurator
{
	public static IServiceCollection AddServices(this IServiceCollection collection)
	{
		collection.AddSingleton<IDriverService, DriversService>();
		collection.AddSingleton<IDriversRepository, DriversRepository>();

		collection.AddSingleton<IVehicleService, VehiclesService>();
		collection.AddSingleton<IVehiclesRepository, VehiclesRepository>();

		collection.AddSingleton<IHistoryService, HistoriesService>();
		collection.AddSingleton<IHistoryRepository, HistoriesRepository>();

        return collection;
	}
}
