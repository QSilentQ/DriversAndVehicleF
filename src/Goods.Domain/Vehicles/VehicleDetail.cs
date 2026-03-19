using Goods.Domain.Drivers;
using Goods.Domain.Shared.Enums;

namespace Goods.Domain.Vehicles;

public class VehicleDetail(
    Guid id,
    Guid? driver_id,
    String name,
    String state_number,
    LicenseCategory vehicle_category,
    Decimal average_speed,
    Decimal fuel_consumption,
    Driver? driver
)
{
    public Guid Id { get; set; } = id;
    public Guid? DriverId { get; set; } = driver_id;
    public String Name { get; set; } = name;
    public String StateNumber { get; set; } = state_number;
    public LicenseCategory VehicleCategory { get; set; } = vehicle_category;
    public Decimal AverageSpeed { get; set; } = average_speed;
    public Decimal FuelConsumption { get; set; } = fuel_consumption;
    public Driver? Driver { get; set; } = driver;
}
