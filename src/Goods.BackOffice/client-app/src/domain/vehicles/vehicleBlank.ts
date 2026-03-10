import { VehicleCategory } from "./enums/vehicleCategory";
import { Vehicle } from "./vehicle";

export interface VehicleBlank {
  id: string | null;
  driverId: string | null;
  name: string | null;
  stateNumber: string | null;
  vehicleCategory: VehicleCategory | null;
  averageSpeed: number | null;
  fuelConsumption: number | null;
}

export namespace VehicleBlank {
  export function getDefault(): VehicleBlank {
    return {
      id: null,
      driverId: null,
      name: null,
      stateNumber: null,
      vehicleCategory: null,
      averageSpeed: null,
      fuelConsumption: null
    };
  }

  export function fromVehicle(vehicle: Vehicle): VehicleBlank {
    return {
      id: vehicle.id,
      driverId: vehicle.driverId,
      name: vehicle.name,
      stateNumber: vehicle.stateNumber,
      vehicleCategory: vehicle.vehicleCategory,
      averageSpeed: vehicle.averageSpeed,
      fuelConsumption: vehicle.fuelConsumption
    }
  }
}
