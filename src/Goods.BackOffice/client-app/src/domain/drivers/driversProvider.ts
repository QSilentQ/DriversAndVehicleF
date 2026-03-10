import { Page } from "../../tools/types/page";
import { Result } from "../../tools/types/results/result";
import { Driver, mapToDriver, mapToDriversPage } from "./driver";
import { DriverBlank } from "./driverBlank";

export class DriversProvider {
  private static readonly headers: HeadersInit = [
    ['X-Requested-With', 'XMLHttpRequest'],
    ['Content-Type', 'application/json']
  ]

  public static async saveDriver(driverBlank: DriverBlank): Promise<Result> {
    const body = JSON.stringify(driverBlank, (key, value) =>
      value instanceof Date ? value.toISOString().slice(0, 10) : value
    );
    const response = await fetch('/drivers/save', {
      method: 'POST',
      headers: this.headers,
      body
    });
    const json = await response.json();

    return Result.get(json);
  }

  public static async getDriversPage(page: number, countInPage: number): Promise<Page<Driver>> {
    const response = await fetch(`/drivers/get_page?page=${page}&countInPage=${countInPage}`, {
      method: 'GET',
      headers: this.headers
    });
    const json = await response.json();

    return mapToDriversPage(json);
  }

  public static async getDriverById(driverId: string): Promise<Driver | null> {
    const response = await fetch(`/drivers/get_by_id?driverId=${driverId}`, {
      method: 'GET',
      headers: this.headers
    });
    const json = await response.json();

    return mapToDriver(json);
  }

  public static async markDriverAsRemoved(driverId: string): Promise<Result> {
    const response = await fetch(`/drivers/mark_driver_as_removed?driverId=${driverId}`, {
      method: 'GET',
      headers: this.headers
    });
    const json = await response.json();

    return Result.get(json);
  }

  public static async getAssignedDriverIds(): Promise<string[]> {
    const response = await fetch('/drivers/get_assigned_driver_ids', {
      method: 'GET',
      headers: this.headers
    });
    const json = await response.json();
    
    return Array.isArray(json) ? json : [];
  }
}