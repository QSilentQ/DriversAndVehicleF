using Goods.Domain.Drivers;
using Goods.Domain.Histories;
using Goods.Domain.Services;
using Goods.Domain.Shared.Enums;
using Goods.Domain.Vehicles;
using Goods.Services.Drivers.Repositories.Interfaces;
using Goods.Services.Vehicles.Repositories.Interfaces;
using Goods.Services.Vehicles.Repositories.Models;
using Goods.Tools.Extensions;
using Goods.Tools.Types.Results;
using System.Xml.Linq;

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

            DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);

            Result validation = ValidateDriverForVehicle(driver, vehicleBlank.VehicleCategory!.Value, today);

            if (!validation.IsSuccess) return validation;
        }

        vehicleBlank.Id ??= Guid.NewGuid();

        vehiclesRepository.SaveVehicle(vehicleBlank);

        return Result.Success();
    }

    public Page<Vehicle> GetVehiclesPage(Int32 page, Int32 countInPage)
    {
        return vehiclesRepository.GetVehiclesPage(page, countInPage);
    }

    public Page<VehicleDetail> GetVehicleDetails(Int32 page, Int32 countInPage)
    {
        Page<Vehicle> vehiclesPage = vehiclesRepository.GetVehiclesPage(page, countInPage);
        Vehicle[] vehicles = vehiclesPage.Values;

        Guid[] driverIds = vehicles
            .Where(v => v.DriverId.HasValue)
            .Select(v => v.DriverId!.Value)
            .ToArray();

        Driver[] drivers = driversRepository.GetDriversByIds(driverIds);

        Dictionary<Guid, Driver> driversById = drivers.ToDictionary(d => d.Id);

        return vehiclesPage.Convert(v =>
        {
            Driver? driver = null;

            if (v.DriverId.HasValue)
            {
                driversById.TryGetValue(v.DriverId.Value, out driver);
            }

            return new VehicleDetail(
                v.Id,
                v.DriverId,
                v.Name,
                v.StateNumber,
                v.VehicleCategory,
                v.AverageSpeed,
                v.FuelConsumption,
                driver
            );
        });
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
        Vehicle[] vehicles = vehiclesRepository.GetAllVehicles();
        Driver[] drivers = driversRepository.GetAllDrivers();
        DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
        List<(Guid VehicleId, Guid DriverId)> newAssignments = [];
        HashSet<Guid> assignedDriverIds = [];

        foreach (Vehicle vehicle in vehicles)
        {
            Guid? driverId = null;
            Driver[] validDrivers = drivers.Where(driver => IsDriverValidForVehicle(driver, vehicle, today)).ToArray();
            Driver[] priorityValidDrivers = validDrivers
                .Where(driver => driver.LastVacationDatetimeUtc is not null && !assignedDriverIds.Contains(driver.Id))
                .OrderBy(driver => driver.LastVacationDatetimeUtc)
                .ToArray();

            if (priorityValidDrivers.Length > 0)
            {
                driverId = priorityValidDrivers[0].Id;
                assignedDriverIds.Add(driverId.Value);
            }
            else if (validDrivers.Length > 0)
            {
                driverId = validDrivers[Random.Shared.Next(validDrivers.Length)].Id;
            }

            vehiclesRepository.UpdateDriverForVehicle(vehicle.Id, driverId);

            if (driverId is not null)
                newAssignments.Add((vehicle.Id, driverId.Value));
        }

        Guid[] driversOnShiftIds = newAssignments
            .Select(a => a.DriverId)
            .ToArray();
        driversRepository.ClearVacationFromDrivers(driversOnShiftIds
            .Select(id => (Guid?)id)
            .ToArray());
        Guid?[] driversOnVacationIds = drivers
            .Select(d => d.Id)
            .Where(id => !driversOnShiftIds.Contains(id))
            .Select(id => (Guid?)id)
            .ToArray();
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

    private static Result ValidateDriverForVehicle(Driver driver, LicenseCategory vehicleCategory, DateOnly today)
    {
        if (driver.DriverLicenseCategory is null || !driver.DriverLicenseCategory.Contains(vehicleCategory))
            return Result.Failed($"Для управления данным транспортным средством водителю нужна категория прав - {vehicleCategory}.");

        if (vehicleCategory == LicenseCategory.Buses)
        {
            Int32 age = driver.Birthday.GetFullYearsCount(today);
            Int32 experience = driver.Experience.GetFullYearsCount(today);

            if (age < MIN_AGE_FOR_BUS_YEARS)
                return Result.Failed($"Для управления автобусом водителю должно быть не менее {MIN_AGE_FOR_BUS_YEARS} лет.");

            if (experience < MIN_EXPERIENCE_FOR_BUS_YEARS)
                return Result.Failed($"Для управления автобусом необходим стаж не менее {MIN_EXPERIENCE_FOR_BUS_YEARS} лет.");
        }

        return Result.Success();
    }

    public List<DriverVehiclesCount> GetCountAvailibleVehiclesOnDrivers(Guid[] driverIds)
    {
        Driver[] drivers = driversRepository.GetDriversByIds(driverIds);
        DateOnly today = DateOnly.FromDateTime(DateTime.UtcNow);
        List<DriverVehiclesCount> availibleVehicles = [];

        LicenseCategory[] licenseCategories = drivers
            .SelectMany(driver => driver.DriverLicenseCategory)
            .Distinct()
            .ToArray();

        Vehicle[] vehicles = vehiclesRepository.GetVehiclesByCategory(licenseCategories);

        foreach (Driver driver in drivers) {
            Int32 vehiclesCount = vehicles.Where(vehicle => IsDriverValidForVehicle(driver, vehicle, today)).ToArray().Length;

            availibleVehicles.Add(new DriverVehiclesCount(driver.Id, vehiclesCount));
        }

        return availibleVehicles;
    }

    private static Boolean IsDriverValidForVehicle(Driver driver, Vehicle vehicle, DateOnly today)
    {
        return ValidateDriverForVehicle(driver, vehicle.VehicleCategory, today).IsSuccess;
    }
}
