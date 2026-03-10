using Goods.Domain.Services;
using Goods.Services.Drivers;
using Goods.Services.Drivers.Repositories;
using Goods.Services.Drivers.Repositories.Interfaces;
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

		return collection;
	}
}
