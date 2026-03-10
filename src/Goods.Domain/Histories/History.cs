namespace Goods.Domain.Histories;

public class History(
    Guid id,
    Guid driverId,
    Guid vehicleId)
{
    public Guid Id { get; } = id;
    public Guid DriverId { get; } = driverId;
    public Guid VehicleId { get; } = vehicleId;
}
