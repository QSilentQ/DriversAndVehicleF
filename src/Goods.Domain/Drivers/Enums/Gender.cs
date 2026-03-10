using System.ComponentModel.DataAnnotations;

namespace Goods.Domain.Drivers.Enums;

public enum Gender
{
    [Display(Name = "Мужской")]
    Male = 1,

    [Display(Name = "Женский")]
    Female = 2,
}
