export enum DriverLicenseCategory {
  MotorCycles = 1,
  Cars = 2,
  Trucks = 3,
  Buses = 4,
}

export namespace DriverLicenseCategory {
  export const getDisplayName = (category: DriverLicenseCategory): string => {
    switch (category) {
      case DriverLicenseCategory.MotorCycles:
        return "Мотоциклы";
      case DriverLicenseCategory.Cars:
        return "Автомобили";
      case DriverLicenseCategory.Trucks:
        return "Грузовики";
      case DriverLicenseCategory.Buses:
        return "Автобусы";
    }
  };
}
