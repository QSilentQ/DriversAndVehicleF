using Goods.Domain.Vehicles;
using Goods.Services.Vehicles.Repositories.Converters;
using Goods.Services.Vehicles.Repositories.Interfaces;
using Goods.Services.Vehicles.Repositories.Models;
using Goods.Services.Vehicles.Repositories.Queries;
using Goods.Tools.Utils;
using static Goods.Tools.Utils.NumberUtils;

namespace Goods.Services.Vehicles.Repositories;

internal class VehiclesRepository : IVehiclesRepository
{
    public void SaveVehicle(VehicleBlank vehicleBlank)
    {
        DatabaseUtils.Execute(
            Sql.VehicleSave,
            (parameters) =>
            {
                parameters.AddWithValue("p_id", vehicleBlank.Id ?? Guid.NewGuid());
                parameters.AddWithValue("p_driver_id", (Object?)vehicleBlank.DriverId ?? DBNull.Value);
                parameters.AddWithValue("p_name", vehicleBlank.Name!);
                parameters.AddWithValue("p_state_number", vehicleBlank.StateNumber!);
                parameters.AddWithValue("p_vehicle_category", (Int32)vehicleBlank.VehicleCategory!);
                parameters.AddWithValue("p_average_speed", (Decimal)vehicleBlank.AverageSpeed!);
                parameters.AddWithValue("p_fuel_consumption", (Decimal)vehicleBlank.FuelConsumption!);
                parameters.AddWithValue("p_current_datetime_utc", DateTime.UtcNow);
            }
        );
    }

    public Page<Vehicle> GetVehiclesPage(Int32 page, Int32 countInPage)
    {
        (Int32 offset, Int32 limit) = NormalizeRange(page, countInPage);

        return DatabaseUtils
            .GetPage(
                Sql.GetVehiclesPage,
                (parametres) =>
                {
                    parametres.AddWithValue("@p_offset", offset);
                    parametres.AddWithValue("@p_limit", limit);
                },
                (reader) => reader.ToVehicleDb()
            )
            .Convert(vehicleDb => vehicleDb.ToVehicle());
    }

    public Vehicle? GetVehicle(Guid vehicleId)
    {
        return DatabaseUtils
            .Get<VehicleDb?>(
                Sql.GetVehicleById,
                (parametres) =>
                {
                    parametres.AddWithValue("@p_vehicle_id", vehicleId);
                },
                (reader) => reader.ToVehicleDb()
            )
            ?.ToVehicle();
    }

    public void MarkVehicleAsRemoved(Guid vehicleId)
    {
        DatabaseUtils.Execute(
            Sql.MarkVehicleAsRemoved,
            (parametres) =>
            {
                parametres.AddWithValue("p_vehicle_id", vehicleId);
                parametres.AddWithValue("p_current_datetime_utc", DateTime.UtcNow);
            }
        );
    }

    public IReadOnlyList<Guid> GetAssignedDriverIds()
    {
        return DatabaseUtils.GetList(
            Sql.GetAssignedDriverIds,
            parameters => { },
            (reader) => reader.GetGuid(0)
        );
    }

    public void UpdateDriverForVehicle(Guid vehicleId, Guid? driverId)
    {
        DatabaseUtils.Execute(
            Sql.UpdateDriverForVehicle,
            (parametres) =>
            {
                parametres.AddWithValue("p_vehicle_id", vehicleId);
                parametres.AddWithValue("p_driver_id", (Object?)driverId ?? DBNull.Value);
                parametres.AddWithValue("p_current_datetime_utc", DateTime.UtcNow);
            }
        );
    }
}
