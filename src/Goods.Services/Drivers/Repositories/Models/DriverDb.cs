using Goods.Domain.Drivers.Enums;
using Goods.Domain.Shared.Enums;

namespace Goods.Services.Drivers.Repositories.Models;

public class DriverDb(
    Guid id,
    String firstName,
    String secondName,
    String lastName,
    Gender gender,
    LicenseCategory[] driverLicenseCategory,
    DateOnly experience,
    DateOnly birthday,
    Decimal payPerHour,
    DateTime createdDateTimeUTC,
    DateTime? modifiedDateTimeUTC,
    Boolean isRemoved)
{
    public Guid Id { get; set; } = id;
    public String FirstName { get; set; } = firstName;
    public String SecondName { get; set; } = secondName;
    public String LastName { get; set; } = lastName;
    public Gender Gender { get; set; } = gender;
    public LicenseCategory[] DriverLicenseCategory { get; set; } = driverLicenseCategory;
    public DateOnly Birthday { get; set; } = birthday;
    public DateOnly Experience { get; set; } = experience;
    public Decimal PayPerHour { get; set; } = payPerHour;
    public DateTime CreatedDateTimeUTC { get; set; } = createdDateTimeUTC;
    public DateTime? ModifiedDateTimeUTC { get; set; } = modifiedDateTimeUTC;
    public Boolean IsRemoved { get; set; } = isRemoved;
}
