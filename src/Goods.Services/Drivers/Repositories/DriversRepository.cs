using Goods.Domain.Drivers;
using Goods.Services.Drivers.Repositories.Converters;
using Goods.Services.Drivers.Repositories.Interfaces;
using Goods.Services.Drivers.Repositories.Models;
using Goods.Services.Drivers.Repositories.Queries;
using Goods.Tools.Utils;
using static Goods.Tools.Utils.NumberUtils;

namespace Goods.Services.Drivers.Repositories;

internal class DriversRepository : IDriversRepository
{
    public void SaveDriver(DriverBlank driverBlank)
    {
        DatabaseUtils.Execute(
            Sql.DriverSave,
            (parameters) =>
            {
                parameters.AddWithValue("p_id", driverBlank.Id!.Value);
                parameters.AddWithValue("p_first_name", driverBlank.FirstName!);
                parameters.AddWithValue("p_second_name", driverBlank.SecondName!);
                parameters.AddWithValue("p_last_name", driverBlank.LastName!);
                parameters.AddWithValue("p_gender", (Int32)driverBlank.Gender!);
                parameters.AddWithValue("p_driver_license_category", Array.ConvertAll(driverBlank.DriverLicenseCategory!, category => (Int32)category));
                parameters.AddWithValue("p_birthday", DateOnly.FromDateTime(driverBlank.Birthday!.Value));
                parameters.AddWithValue("p_experience", DateOnly.FromDateTime(driverBlank.Experience!.Value));
                parameters.AddWithValue("p_pay_per_hour", (Decimal)driverBlank.PayPerHour!);
                parameters.AddWithValue("p_current_datetime_utc", DateTime.UtcNow);
            }
        );
    }

    public Page<Driver> GetDriversPage(Int32 page, Int32 countInPage)
    {
        (Int32 offset, Int32 limit) = NormalizeRange(page, countInPage);

        return DatabaseUtils
            .GetPage(
                Sql.GetDriversPage,
                (parameters) =>
                {
                    parameters.AddWithValue("@p_offset", offset);
                    parameters.AddWithValue("@p_limit", limit);
                },
                (reader) => reader.ToDriverDb()
            )
            .Convert(driverDb => driverDb.ToDriver());
    }

    public Driver? GetDriver(Guid driverId)
    {
        return DatabaseUtils
            .Get<DriverDb?>(
                Sql.GetDriverById,
                (parameters) =>
                {
                    parameters.AddWithValue("@p_driver_id", driverId);
                },
                (reader) => reader.ToDriverDb()
            )
            ?.ToDriver();
    }

    public void MarkDriverAsRemoved(Guid driverId)
    {
        DatabaseUtils.Execute(
            Sql.MarkDriverAsRemoved,
            (parameters) =>
            {
                parameters.AddWithValue("p_driver_id", driverId);
                parameters.AddWithValue("p_current_datetime_utc", DateTime.UtcNow);
            }
        );
    }

    public void ClearVacationFromDrivers(Guid?[] driverIds)
    {
        DatabaseUtils.Execute(
            Sql.SetVacationNull,
            (parameters) =>
            {
                parameters.AddWithValue("p_driverIds", driverIds);
            }
        );
    }

    public void SetVacationFromDrivers(Guid?[] driverIds)
    {
        DatabaseUtils.Execute(
            Sql.SetVacationToday,
            (parameters) =>
            {
                parameters.AddWithValue("p_driverIds", driverIds);
                parameters.AddWithValue("p_current_datetime_utc", DateTime.UtcNow);
            }
        );
    }
}
