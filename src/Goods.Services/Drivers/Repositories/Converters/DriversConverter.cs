using Goods.Domain.Drivers;
using Goods.Domain.Shared.Enums;
using Goods.Domain.Drivers.Enums;
using Goods.Services.Drivers.Repositories.Models;
using Npgsql;

namespace Goods.Services.Drivers.Repositories.Converters;

internal static class DriversConverter
{
    internal static Driver[] ToDrivers(this DriverDb[] driverDBs) => [.. driverDBs.Select(ToDriver)];

    internal static Driver ToDriver(this DriverDb driverDb)
    {
        return new Driver(
            driverDb.Id,
            driverDb.FirstName,
            driverDb.SecondName,
            driverDb.LastName,
            driverDb.Gender,
            driverDb.DriverLicenseCategory,
            driverDb.Experience,
            driverDb.Birthday,
            driverDb.PayPerHour,
            driverDb.IsRemoved
        );
    }

    internal static DriverDb ToDriverDb(this NpgsqlDataReader reader)
    {
        return new DriverDb(
            reader.GetGuid(reader.GetOrdinal("id")),
            reader.GetString(reader.GetOrdinal("first_name")),
            reader.GetString(reader.GetOrdinal("second_name")),
            reader.GetString(reader.GetOrdinal("last_name")),
            (Gender)reader.GetInt32(reader.GetOrdinal("gender")),
            Array.ConvertAll(reader.GetFieldValue<Int32[]>(reader.GetOrdinal("driver_license_category")), category => (LicenseCategory)category),
            DateOnly.FromDateTime(reader.GetDateTime(reader.GetOrdinal("experience"))),
            DateOnly.FromDateTime(reader.GetDateTime(reader.GetOrdinal("birthday"))),
            Convert.ToDecimal(reader.GetFloat(reader.GetOrdinal("pay_per_hour"))),
            reader.GetDateTime(reader.GetOrdinal("created_datetime_utc")),
            reader.IsDBNull(reader.GetOrdinal("modified_datetime_utc"))
                ? null
                : reader.GetDateTime(reader.GetOrdinal("modified_datetime_utc")),
            reader.GetBoolean(reader.GetOrdinal("is_removed"))
        );
    }
}
