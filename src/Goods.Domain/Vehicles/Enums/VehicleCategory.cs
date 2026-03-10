using System.ComponentModel.DataAnnotations;

namespace Goods.Domain.Vehicles.Enums;

public enum VehicleCategory
{
    [Display(Name = "А")]
    MotorCycles = 1,

    [Display(Name = "А")]
    Cars = 2,

    [Display(Name = "А")]
    Trucks = 3,

    [Display(Name = "А")]
    Buses = 4,
}
