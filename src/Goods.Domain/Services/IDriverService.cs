using Goods.Domain.Drivers;
using Goods.Tools.Types.Results;

namespace Goods.Domain.Services;

public interface IDriverService
{
    Result SaveDriver(DriverBlank driverBlank);
    Page<Driver> GetDriversPage(Int32 page, Int32 countInPage);
    Driver? GetDriver(Guid driver_id);
    Result MarkDriverAsRemoved(Guid driver_id);
}
