using Goods.Domain.Vehicles;

namespace Goods.Services.Vehicles.Repositories.Interfaces;

public interface IVehiclesRepository
{
    void SaveVehicle(VehicleBlank vehicleBlank);
    Page<Vehicle> GetVehiclesPage(Int32 page, Int32 countInPage);
    Vehicle? GetVehicle(Guid vehicle_id);
    void MarkVehicleAsRemoved(Guid vehicle_id);
    IReadOnlyList<Guid> GetAssignedDriverIds();
    void UpdateDriverForVehicle(Guid vehicle_id, Guid? driver_id);
}