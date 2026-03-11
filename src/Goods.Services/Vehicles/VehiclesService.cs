using Goods.Domain.Drivers;
using Goods.Domain.Histories;
using Goods.Domain.Services;
using Goods.Domain.Shared.Enums;
using Goods.Domain.Vehicles;
using Goods.Services.Drivers.Repositories.Interfaces;
using Goods.Services.Vehicles.Repositories.Interfaces;
using Goods.Tools.Types.Results;

namespace Goods.Services.Vehicles;

public class VehiclesService(IVehiclesRepository vehiclesRepository, IDriversRepository driversRepository, IHistoryService historyService) : IVehicleService
{
    private const Int32 MAX_VEHICLE_NAME_LENGTH = 255;
    private const Int32 MIN_AGE_FOR_BUS_YEARS = 21;
    private const Int32 MIN_EXPERIENCE_FOR_BUS_YEARS = 3;
    private const Int32 GAS_PRICE = 100;
    private const Int32 CRUISE_RANGE = 100;
    private const Decimal INCOME_MARKUP = 1.3M;


    public Result SaveVehicle(VehicleBlank vehicleBlank)
    {
        if (vehicleBlank.VehicleCategory is null)
            return Result.Failed("Выберите категорию транспортного средства");

        if (!Enum.IsDefined(vehicleBlank.VehicleCategory.Value))
            return Result.Failed("Выбранная категория не существует. Пожалуйста, выберите другую");

        if (String.IsNullOrWhiteSpace(vehicleBlank.Name))
            return Result.Failed("Введите название транспортного средства");

        if (String.IsNullOrWhiteSpace(vehicleBlank.StateNumber))
            return Result.Failed("Введите номер транспортного средства");

        if (vehicleBlank.AverageSpeed is null)
            return Result.Failed("Введите среднюю скорость транспортного средства");

        if (vehicleBlank.FuelConsumption is null)
            return Result.Failed("Введите средний расход топлива транспортного средства");

        if (vehicleBlank.Name.Length == MAX_VEHICLE_NAME_LENGTH)
            return Result.Failed($"Название транспортного средства слишком длинное. Максимально допустимо {MAX_VEHICLE_NAME_LENGTH} символов");

        if (vehicleBlank.DriverId is not null)
        {
            Driver? driver = driversRepository.GetDriver(vehicleBlank.DriverId.Value);
            if (driver is null)
                return Result.Failed("Выбранный водитель не найден.");

            LicenseCategory requiredCategory = vehicleBlank.VehicleCategory!.Value;
            if (driver.DriverLicenseCategory is null || !driver.DriverLicenseCategory.Contains(requiredCategory))
                return Result.Failed($"Для управления данным транспортным средством водителю нужна категория прав - {requiredCategory}.");

            if (vehicleBlank.VehicleCategory == LicenseCategory.Buses)
            {
                DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
                Int32 age = FullYears(driver.Birthday, today);
                Int32 experienceYears = FullYears(driver.Experience, today);
                if (age < MIN_AGE_FOR_BUS_YEARS)
                    return Result.Failed($"Для управления автобусом водителю должно быть не менее {MIN_AGE_FOR_BUS_YEARS} лет.");
                if (experienceYears < MIN_EXPERIENCE_FOR_BUS_YEARS)
                    return Result.Failed($"Для управления автобусом необходим стаж не менее {MIN_EXPERIENCE_FOR_BUS_YEARS} лет.");
            }
        }

        vehicleBlank.Id ??= Guid.NewGuid();

        vehiclesRepository.SaveVehicle(vehicleBlank);

        return Result.Success();
    }

    public Page<Vehicle> GetVehiclesPage(Int32 page, Int32 countInPage)
    {
        return vehiclesRepository.GetVehiclesPage(page, countInPage);
    }

    public Vehicle? GetVehicle(Guid vehicleId)
    {
        return vehiclesRepository.GetVehicle(vehicleId);
    }

    public Result MarkVehicleAsRemoved(Guid vehicleId)
    {
        Vehicle? existVehicle = GetVehicle(vehicleId);
        if (existVehicle is null)
            return Result.Failed("Транспортное средство не найдено. Возможно, оно было удалено");

        vehiclesRepository.MarkVehicleAsRemoved(vehicleId);
        return Result.Success();
    }

    public Decimal CalcCostHundredKMCruise(Guid vehicleId)
    {
        Vehicle? vehicle = GetVehicle(vehicleId);
        if (vehicle is null || vehicle.DriverId is null)
            throw new Exception("Автомобиль не найден или у него нет водителя");

        Driver? driver = driversRepository.GetDriver(vehicle.DriverId.Value) ?? throw new Exception("Водитель не найден");
        Decimal paymentToDriver = (driver.PayPerHour * (CRUISE_RANGE / vehicle.AverageSpeed) + GAS_PRICE * vehicle.FuelConsumption);
        Decimal totalPrice = paymentToDriver * INCOME_MARKUP;

        return totalPrice;
    }

    public IReadOnlyList<Guid> GetAssignedDriverIds()
    {
        return vehiclesRepository.GetAssignedDriverIds();
    }

    public void ReassignDriversRandomly()
    {
        Page<Vehicle> vehiclesPage = vehiclesRepository.GetVehiclesPage(1, 1000);
        Page<Driver> driversPage = driversRepository.GetDriversPage(1, 1000);
        Vehicle[] vehicles = vehiclesPage.Values;
        Driver[] drivers = driversPage.Values;
        DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
        List<(Guid VehicleId, Guid DriverId)> newAssignments = [];

        foreach (Vehicle vehicle in vehicles)
        {
            Guid? driverId = null;
            Driver[] validDrivers = [.. drivers.Where(driver => IsDriverValidForVehicle(driver, vehicle, today))];
            Driver[] priorityValidDrivers = [.. validDrivers.Where(driver => driver.LastVacationDatetimeUtc is not null)];

            if (priorityValidDrivers.Length > 0)
                driverId = priorityValidDrivers[0].Id;
            else if (validDrivers.Length > 0)
                driverId = validDrivers[Random.Shared.Next(validDrivers.Length)].Id;

            VehicleBlank blank = new()
            {
                Id = vehicle.Id,
                DriverId = driverId,
                Name = vehicle.Name,
                StateNumber = vehicle.StateNumber,
                VehicleCategory = vehicle.VehicleCategory,
                AverageSpeed = vehicle.AverageSpeed,
                FuelConsumption = vehicle.FuelConsumption,
                ModifiedDatetimeUTC = DateTime.UtcNow,
                IsRemoved = vehicle.IsRemoved
            };
            vehiclesRepository.SaveVehicle(blank);

            if (driverId is not null)
                newAssignments.Add((vehicle.Id, driverId.Value));
        }

        Guid[] driversOnShiftIds = [.. newAssignments.Select(a => a.DriverId)];
        driversRepository.ClearVacationFromDrivers([.. driversOnShiftIds.Select(id => (Guid?)id)]);
        Guid?[] driversOnVacationIds = [.. drivers.Select(d => d.Id).Where(id => !driversOnShiftIds.Contains(id))];
        driversRepository.SetVacationFromDrivers(driversOnVacationIds);

        foreach ((Guid vehicleId, Guid driverId) in newAssignments)
        {
            historyService.SaveHistory(new HistoryBlank {
                VehicleId = vehicleId,
                DriverId = driverId,
                CreatedDatetimeUTC = DateTime.UtcNow
            });
        }
    }

    private static Boolean IsDriverValidForVehicle(Driver driver, Vehicle vehicle, DateOnly today)
    {
        LicenseCategory requiredCategory = vehicle.VehicleCategory;
        if (driver.DriverLicenseCategory is null || !driver.DriverLicenseCategory.Contains(requiredCategory))
            return false;

        if (vehicle.VehicleCategory == LicenseCategory.Buses)
        {
            Int32 age = FullYears(driver.Birthday, today);
            Int32 experienceYears = FullYears(driver.Experience, today);
            if (age < MIN_AGE_FOR_BUS_YEARS || experienceYears < MIN_EXPERIENCE_FOR_BUS_YEARS)
                return false;
        }

        return true;
    }

    private static Int32 FullYears(DateOnly from, DateOnly to)
    {
        Int32 years = to.Year - from.Year;
        if (from.AddYears(years) > to) years--;
        return years;
    }
}
