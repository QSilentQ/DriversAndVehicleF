using Goods.Domain.Drivers.Enums;

namespace Goods.Domain.Drivers;

public class DriverBlank
{
    public Guid? Id { get; set; }
    public String? FirstName { get; set; }
    public String? SecondName { get; set; }
    public String? LastName { get; set; }
    public Gender? Gender { get; set; }
    public LicenseCategory[]? DriverLicenseCategory { get; set; }
    public DateTime? Birthday { get; set; }
    public DateTime? Experience { get; set; }
    public Decimal? PayPerHour { get; set; }
    public DateTime? CreatedDatetimeUTC { get; set; }
    public DateTime ModifiedDatetimeUTC { get; set; }
    public Boolean IsRemoved { get; set; }
}
