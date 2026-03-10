using Goods.Domain.Drivers;
using Goods.Domain.Services;
using Goods.Domain.Drivers.Enums;
using Goods.Services.Drivers.Repositories.Interfaces;
using Goods.Tools.Types.Results;

namespace Goods.Services.Drivers;

public class DriversService(IDriversRepository driversRepository) : IDriverService
{
    private const Int32 MAX_VEHICLE_NAME_LENGTH = 255;

    public Result SaveDriver(DriverBlank? driverBlank)
    {
        if (driverBlank is null)
            return Result.Failed("Данные водителя не получены. Проверьте формат запроса.");

        if (String.IsNullOrWhiteSpace(driverBlank.FirstName))
            return Result.Failed("Введите Фамилию водителя");

        if (String.IsNullOrWhiteSpace(driverBlank.SecondName))
            return Result.Failed("Введите Имя водителя");

        if (driverBlank.Gender is null)
            return Result.Failed("Выберите пол водителя");

        if (!Enum.IsDefined(driverBlank.Gender.Value))
            return Result.Failed("Выбранный пол не существует. Пожалуйста, выберите другой");

        if (driverBlank.DriverLicenseCategory is null)
            return Result.Failed("Выберите категорию водительских прав");

        if (driverBlank.DriverLicenseCategory.Any(category => !Enum.IsDefined(category)))
            return Result.Failed("Выбрана одна или несколько некорректных категорий прав");

        if (driverBlank.Experience is null)
            return Result.Failed("Введите опыт вождения водителя");

        if (driverBlank.Birthday is null)
            return Result.Failed("Введите дату рождения водителя");

        if (driverBlank.PayPerHour is null)
            return Result.Failed("Введите оплату водителя в час");

        if (driverBlank.FirstName.Length + driverBlank.SecondName.Length + driverBlank.LastName!.Length >= MAX_VEHICLE_NAME_LENGTH)
            return Result.Failed($"ФИО водителя слишком длинное. Максимально допустимо {MAX_VEHICLE_NAME_LENGTH} символов");

        driverBlank.Id ??= Guid.NewGuid();

        driversRepository.SaveDriver(driverBlank);

        return Result.Success();
    }

    public Page<Driver> GetDriversPage(Int32 page, Int32 countInPage)
    {
        return driversRepository.GetDriversPage(page, countInPage);
    }

    public Driver? GetDriver(Guid driverId)
    {
        return driversRepository.GetDriver(driverId);
    }

    public Result MarkDriverAsRemoved(Guid driverId)
    {
        Driver? existDriver = GetDriver(driverId);
        if (existDriver is null)
            return Result.Failed("Водитель не найден. Возможно, он был удалён");

        driversRepository.MarkDriverAsRemoved(driverId);
        return Result.Success();
    }
}
