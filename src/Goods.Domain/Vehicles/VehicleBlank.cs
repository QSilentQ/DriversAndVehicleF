using Goods.Domain.Vehicles.Enums;

namespace Goods.Domain.Vehicles;

public class VehicleBlank
{
    public Guid? Id { get; set; }
    public Guid? DriverId { get; set; }
    public String? Name { get; set; }
    public String? StateNumber { get; set; }
    public VehicleCategory? VehicleCategory { get; set; }
    public Decimal? AverageSpeed { get; set; }
    public Decimal? FuelConsumption { get; set; }
    public DateTime? CreatedDatetimeUTC { get; set; }
    public DateTime ModifiedDatetimeUTC { get; set; }
    public Boolean IsRemoved { get; set; }
}
