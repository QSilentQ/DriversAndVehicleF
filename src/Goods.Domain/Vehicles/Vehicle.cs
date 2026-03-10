using Goods.Domain.Shared.Enums;

namespace Goods.Domain.Vehicles;

public class Vehicle(
    Guid id, 
    Guid? driverId,
    String name,
    String stateNumber, 
    LicenseCategory vehicleCategory,
    Decimal averageSpeed,
    Decimal fuelConsumption,
    Boolean isRemoved)
{
    public Guid Id { get; } = id;
    public Guid? DriverId { get; } = driverId;
    public String Name { get; } = name;
    public String StateNumber { get; } = stateNumber;
    public LicenseCategory VehicleCategory { get; } = vehicleCategory;
    public Decimal AverageSpeed { get; } = averageSpeed;
    public Decimal FuelConsumption { get; } = fuelConsumption;
    public Boolean IsRemoved { get; } = isRemoved;
}
