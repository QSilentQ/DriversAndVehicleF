import { DriverLicenseCategory } from "./enums/driverLicenseCategory";
import { Gender } from "./enums/gender";
import { Driver } from "./driver";

export interface DriverBlank {
  id: string | null;
  firstName: string | null;
  secondName: string | null;
  lastName: string | null;
  gender: Gender | null;
  driverLicenseCategory: DriverLicenseCategory[];
  birthday: Date | null;
  experience: Date | null;
  payPerHour: number | null;
}

export namespace DriverBlank {
  export function getDefault(): DriverBlank {
    return {
      id: null,
      firstName: null,
      secondName: null,
      lastName: null,
      gender: null,
      driverLicenseCategory: [],
      birthday: null,
      experience: null,
      payPerHour: null
    };
  }

  export function fromDriver(driver: Driver): DriverBlank {
    return {
      id: driver.id,
      firstName: driver.firstName,
      secondName: driver.secondName,
      lastName: driver.lastName,
      gender: driver.gender,
      driverLicenseCategory: driver.driverLicenseCategory,
      birthday: driver.birthday,
      experience: driver.experience,
      payPerHour: driver.payPerHour
    }
  }
}