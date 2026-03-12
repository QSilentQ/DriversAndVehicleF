using Goods.Domain.Drivers;

namespace Goods.Services.Drivers.Repositories.Interfaces;

public interface IDriversRepository
{
    void SaveDriver(DriverBlank vehicleBlank);
    Page<Driver> GetDriversPage(Int32 page, Int32 countInPage);
    Driver[] GetAllDrivers();
    Driver[] GetDriversByIds(Guid[] driverIds);
    Driver? GetDriver(Guid driver_id);
    void MarkDriverAsRemoved(Guid driver_id);
    void ClearVacationFromDrivers(Guid?[] driverIds);
    void SetVacationFromDrivers(Guid?[] driverIds);
}
