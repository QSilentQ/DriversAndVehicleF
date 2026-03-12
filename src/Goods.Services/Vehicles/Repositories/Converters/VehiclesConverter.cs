using Goods.Domain.Shared.Enums;
using Goods.Domain.Vehicles;
using Goods.Services.Vehicles.Repositories.Models;
using Npgsql;

namespace Goods.Services.Vehicles.Repositories.Converters;

internal static class VehiclesConverter
{
    internal static Vehicle[] ToVehicles(this VehicleDb[] vehicleDbs) => vehicleDbs.Select(ToVehicle).ToArray();

    internal static Vehicle ToVehicle(this VehicleDb vehicleDb)
    {
        return new Vehicle(
            vehicleDb.Id,
            vehicleDb.DriverId,
            vehicleDb.Name,
            vehicleDb.StateNumber,
            vehicleDb.VehicleCategory,
            vehicleDb.AverageSpeed,
            vehicleDb.FuelConsumption,
            vehicleDb.IsRemoved);
    }

    internal static VehicleDb ToVehicleDb(this NpgsqlDataReader reader)
    {
        return new VehicleDb(
            reader.GetGuid(reader.GetOrdinal("id")),
            reader.IsDBNull(reader.GetOrdinal("driver_id"))
                ? null
                : reader.GetGuid(reader.GetOrdinal("driver_id")),
            reader.GetString(reader.GetOrdinal("name")),
            reader.GetString(reader.GetOrdinal("state_number")),
            (LicenseCategory)reader.GetInt32(reader.GetOrdinal("vehicle_category")),
            Convert.ToDecimal(reader.GetFloat(reader.GetOrdinal("average_speed"))),
            Convert.ToDecimal(reader.GetFloat(reader.GetOrdinal("fuel_consumption"))),
            reader.GetDateTime(reader.GetOrdinal("created_datetime_utc")),
            reader.IsDBNull(reader.GetOrdinal("modified_datetime_utc"))
                ? null
                : reader.GetDateTime(reader.GetOrdinal("modified_datetime_utc")),
            reader.GetBoolean(reader.GetOrdinal("is_removed"))
        );
    }
}
