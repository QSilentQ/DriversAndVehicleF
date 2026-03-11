import { Page } from "../../tools/types/page";
import { DriverLicenseCategory } from "./enums/driverLicenseCategory";
import { Gender } from "./enums/gender";

export class Driver {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly secondName: string,
    public readonly lastName: string,
    public readonly gender: Gender,
    public readonly driverLicenseCategory: DriverLicenseCategory[],
    public readonly birthday: Date,
    public readonly experience: Date,
    public readonly payPerHour: number,
    public readonly lastVacationDatetimeUtc: Date | null,
  ) {}
}

export function mapToDriversPage(data: any): Page<Driver> {
  return Page.convert(data, mapToDriver);
}

export function mapToDrivers(data: any[]): Driver[] {
  return data.map(mapToDriver);
}

export function mapToDriver(data: any): Driver {
  const category = data.driverLicenseCategory;
  const lastVacation = data.lastVacationDatetimeUtc;
  return new Driver(
    data.id,
    data.firstName,
    data.secondName,
    data.lastName,
    data.gender,
    Array.isArray(category) ? category : category != null ? [category] : [],
    data.birthday,
    data.experience,
    data.payPerHour,
    lastVacation != null ? new Date(lastVacation) : null,
  );
}
