export enum VehicleCategory {
  MotorCycles = 1,
  Cars = 2,
  Trucks = 3,
  Buses = 4,
}

export namespace VehicleCategory {
  export const getDisplayName = (category: VehicleCategory): string => {
    switch (category) {
      case VehicleCategory.MotorCycles:
        return "Мотоциклы";
      case VehicleCategory.Cars:
        return "Автомобили";
      case VehicleCategory.Trucks:
        return "Грузовики";
      case VehicleCategory.Buses:
        return "Автобусы";
    }
  };
}
