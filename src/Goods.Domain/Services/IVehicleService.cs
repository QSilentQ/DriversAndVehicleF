using Goods.Domain.Vehicles;
using Goods.Tools.Types.Results;

namespace Goods.Domain.Services;

public interface IVehicleService
{
    Result SaveVehicle(VehicleBlank vehicleBlank);
    Page<Vehicle> GetVehiclesPage(Int32 page, Int32 countInPage);
    Vehicle? GetVehicle(Guid vehicleId);
    Result MarkVehicleAsRemoved(Guid vehicleId);
    Decimal CalcCostHundredKMCruise(Guid vehicleId);
    void ReassignDriversRandomly();
    IReadOnlyList<Guid> GetAssignedDriverIds();
}
