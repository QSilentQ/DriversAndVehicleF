using Goods.Domain.Drivers;

namespace Goods.Services.Drivers.Repositories.Interfaces;

public interface IDriversRepository
{
    void SaveDriver(DriverBlank vehicleBlank);
    Page<Driver> GetDriversPage(Int32 page, Int32 countInPage);
    Driver? GetDriver(Guid vehicle_id);
    void MarkDriverAsRemoved(Guid vehicle_id);
}
