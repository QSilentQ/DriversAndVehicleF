import { Page } from "../../tools/types/page";
import { Result } from "../../tools/types/results/result";
import { mapToVehicle, mapToVehiclesPage, Vehicle } from "./vehicle";
import { VehicleBlank } from "./vehicleBlank";

export class VehiclesProvider {
  private static readonly headers: HeadersInit = [
    ['X-Requested-With', 'XMLHttpRequest'],
		['Content-Type', 'application/json']
  ];

  public static async saveVehicle(vehicleBlank: VehicleBlank): Promise<Result> {
    const response = await fetch('/vehicles/save', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(vehicleBlank)
    });
    const json = await response.json();

    return Result.get(json);
  }

  public static async getVehiclesPage(page: number, countInPage: number): Promise<Page<Vehicle>> {
    const response = await fetch(`/vehicles/get_page?page=${page}&countInPage=${countInPage}`, {
      method: 'GET',
      headers: this.headers
    });
    const json = await response.json();

    return mapToVehiclesPage(json);
  }

  public static async getVehicleById(vehicleId: string): Promise<Vehicle | null> {
    const response = await fetch(`/vehicles/get_by_id?vehicleId=${vehicleId}`, {
      method: 'GET',
      headers: this.headers
    })
    const json = await response.json();

    return mapToVehicle(json);
  }

  public static async markVehicleAsRemoved(vehicleId: string): Promise<Result> {
    const response = await fetch(`/vehicles/mark_vehicle_as_removed?vehicleId=${vehicleId}`, {
      method: 'GET',
      headers: this.headers
    });
    const json = await response.json();

    return Result.get(json);
  }

  public static async getCalcCostHundredKM(vehicleId: string): Promise<{ totalPrice: number } | { error: string }> {
    const response = await fetch(`/vehicles/calc_cost_hundred_km?vehicleId=${vehicleId}`, {
      method: 'GET',
      headers: this.headers
    });
    const json = await response.json();
    
    return { totalPrice: Number(json) };
  }
}