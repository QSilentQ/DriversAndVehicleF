namespace Goods.Services.Histories.Repositories.Models;

public class HistoryDb(
    Guid id,
    Guid driverId,
    Guid vehicleId,
    DateTime createdDatetimeUTC)
{
    public Guid Id { get; } = id;
    public Guid DriverId { get; } = driverId;
    public Guid VehicleId { get; } = vehicleId;
    public DateTime CreatedDatetimeUTC { get; } = createdDatetimeUTC;
}