namespace Goods.Domain.Histories;

public class HistoryBlank
{
    public Guid? Id { get; set; }
    public Guid DriverId { get; set; }
    public Guid VehicleId { get; set; }
    public DateTime CreatedDatetimeUTC { get; set; }
}
