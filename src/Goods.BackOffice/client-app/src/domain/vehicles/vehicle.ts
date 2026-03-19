import { Page } from "../../tools/types/page";
import { VehicleCategory } from "./enums/vehicleCategory";

export class Vehicle {
  constructor(
    public readonly id: string,
    public readonly driverId: string | null,
    public readonly name: string,
    public readonly stateNumber: string,
    public readonly vehicleCategory: VehicleCategory,
    public readonly averageSpeed: number,
    public readonly fuelConsumption: number,
  ) {}
}

export function mapToVehiclesPage(data: any): Page<Vehicle> {
  return Page.convert(data, mapToVehicle);
}

export function mapToVehicles(data: any[]): Vehicle[] {
  return data.map(mapToVehicle);
}

export function mapToVehicle(data: any): Vehicle {
  return new Vehicle(
    data.id,
    data.driverId ?? null,
    data.name,
    data.stateNumber,
    data.vehicleCategory,
    data.averageSpeed,
    data.fuelConsumption,
  );
}

export interface VehicleSource {
  id: string,
  driverId: string | null,
  name: string,
  stateNumber: string,
  vehicleCategory: VehicleCategory,
  averageSpeed: number,
  fuelConsumption: number,
}
