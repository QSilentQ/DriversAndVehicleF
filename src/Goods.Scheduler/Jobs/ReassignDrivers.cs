using Goods.Domain.Services;
using Quartz;

namespace Goods.Scheduler.Jobs;

public class ReassignDrivers(IVehicleService vehicleService) : IJob
{
    private readonly IVehicleService VehicleService = vehicleService;

    public async Task Execute(IJobExecutionContext context)
    {
        VehicleService.ReassignDriversRandomly();
        Console.WriteLine("Переназначение водителей завершено.");
        await Task.CompletedTask;
    }
}
