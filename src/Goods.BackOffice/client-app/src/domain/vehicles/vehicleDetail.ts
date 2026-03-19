import { Driver, DriverSource, mapToDriver } from "../drivers/driver";
import { Page } from "../../tools/types/page";
import { mapToVehicle, Vehicle, VehicleSource } from "./vehicle";

export interface VehicleDetail extends Vehicle {
  driver: Driver | null
}

export function mapToVehiclesDetails(data: VehicleDetailSource[]): VehicleDetail[] {
  return data.map(mapToVehiclesDetail);
}

export function mapToVehiclesDetailsPage(data: any): Page<VehicleDetail> {
  return Page.convert(data, mapToVehiclesDetail);
}

export function mapToVehiclesDetail(data: VehicleDetailSource): VehicleDetail {
  return {
    ...mapToVehicle(data),
    driver: data.driver != null ? mapToDriver(data.driver) : null,
  };
}

interface VehicleDetailSource extends VehicleSource {
  driver: DriverSource | null;
}