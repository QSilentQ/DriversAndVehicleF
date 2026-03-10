using Goods.Domain.Drivers;
using Goods.Domain.Services;
using Goods.Tools.Types.Results;
using Microsoft.AspNetCore.Mvc;

namespace Goods.BackOffice.Controllers.Drivers;

public class DriversController(IDriverService driverService, IVehicleService vehicleService) : AppController
{
    [HttpPost("drivers/save")]
    public Result SaveDriver([FromBody] DriverBlank driverBlank)
    {
        return driverService.SaveDriver(driverBlank);
    }

    [HttpGet("drivers/get_page")]
    public Page<Driver> GetDriversPage([FromQuery] Int32 page, [FromQuery] Int32 countInPage)
    {
        return driverService.GetDriversPage(page, countInPage);
    }

    [HttpGet("drivers/get_by_id")]
    public Driver? GetDriver([FromQuery] Guid driverId)
    {
        return driverService.GetDriver(driverId);
    }

    [HttpGet("drivers/mark_driver_as_removed")]
    public Result MarkDriverAsRemoved([FromQuery] Guid driverId)
    {
        return driverService.MarkDriverAsRemoved(driverId);
    }

    [HttpGet("drivers/get_assigned_driver_ids")]
    public IReadOnlyList<Guid> GetAssignedDriverIds()
    {
        return vehicleService.GetAssignedDriverIds();
    }
}
