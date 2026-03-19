using Goods.Domain.Services;
using Goods.Domain.Vehicles;
using Goods.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;

namespace Goods.BackOffice.Controllers.Vehicles;

public class VehiclesController(IVehicleService vehicleService) : AppController
{
    [HttpPost("vehicles/save")]
    public Result SaveVehicle([FromBody] VehicleBlank vehicleBlank)
    {
        return vehicleService.SaveVehicle(vehicleBlank);
    }

    [HttpGet("vehicles/get_page")]
    public Page<Vehicle> GetVehiclesPage([FromQuery] Int32 page, [FromQuery] Int32 countInPage)
    {
        return vehicleService.GetVehiclesPage(page, countInPage);
    }

    [HttpGet("vehicles/get_by_id")]
    public Vehicle? GetVehicle([FromQuery] Guid vehicleId)
    {
        return vehicleService.GetVehicle(vehicleId);
    }

    [HttpGet("vehicles/mark_vehicle_as_removed")]
    public Result MarkVehicleAsRemoved([FromQuery] Guid vehicleId)
    {
        return vehicleService.MarkVehicleAsRemoved(vehicleId);
    }

    [HttpGet("vehicles/calc_cost_hundred_km")]
    public Decimal CalcCostHundredKMCruise([FromQuery] Guid vehicleId)
    {
        return vehicleService.CalcCostHundredKMCruise(vehicleId);
    }

    [HttpGet("vehicles/get_count_availible_vehicles")]
    public List<DriverVehiclesCount> GetCountAvailibleVehiclesOnDrivers([FromQuery] Guid[] driverIds)
    {
        return vehicleService.GetCountAvailibleVehiclesOnDrivers(driverIds);
    }

    [HttpGet("vehicles/detail")]
    public Page<VehicleDetail> GetVehicleDetails([FromQuery] Int32 page, [FromQuery] Int32 countInPage)
    {
        return vehicleService.GetVehicleDetails(page, countInPage);
    }
}
