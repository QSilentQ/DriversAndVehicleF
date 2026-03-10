using Goods.Domain.Vehicles.Enums;

namespace Goods.Services.Vehicles.Repositories.Models;

public class VehicleDb(
    Guid id,
    Guid? driverId,
    String name,
    String stateNumber,
    VehicleCategory vehicleCategory,
    Decimal averageSpeed,
    Decimal fuelConsumption,
    DateTime createdDatetimeUTC,
    DateTime? modifiedDatetimeUTC,
    Boolean isRemoved)
{
    public Guid Id { get; set; } = id;
    public Guid? DriverId { get; set; } = driverId;
    public String Name { get; set; } = name;
    public String StateNumber { get; set; } = stateNumber;
    public VehicleCategory VehicleCategory { get; set; } = vehicleCategory;
    public Decimal AverageSpeed { get; set; } = averageSpeed;
    public Decimal FuelConsumption { get; set; } = fuelConsumption;
    public DateTime CreatedDatetimeUTC { get; set; } = createdDatetimeUTC;
    public DateTime? ModifiedDatetimeUTC { get; set; } = modifiedDatetimeUTC;
    public Boolean IsRemoved { get; set; } = isRemoved;
}
