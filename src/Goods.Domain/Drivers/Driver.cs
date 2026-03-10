using Goods.Domain.Drivers.Enums;
using Goods.Domain.Shared.Enums;

namespace Goods.Domain.Drivers;

public class Driver(
    Guid id,
    String firstName,
    String secondName,
    String lastName,
    Gender gender,
    LicenseCategory[] driverLicenseCategory,
    DateOnly experience,
    DateOnly birthday,
    Decimal payPerHour,
    Boolean isRemoved)
{
    public Guid Id { get; } = id;
    public String FirstName { get; } = firstName;
    public String SecondName { get; } = secondName;
    public String LastName { get; } = lastName;
    public Gender Gender { get; } = gender;
    public LicenseCategory[] DriverLicenseCategory { get; } = driverLicenseCategory;
    public DateOnly Birthday { get; } = birthday;
    public DateOnly Experience { get; } = experience;
    public Decimal PayPerHour { get; } = payPerHour;
    public Boolean IsRemoved { get; } = isRemoved;
}
