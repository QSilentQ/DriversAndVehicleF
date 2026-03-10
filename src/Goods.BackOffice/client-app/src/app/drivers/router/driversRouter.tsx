import React from "react";
import { Route } from "react-router-dom";
import { DriverLink } from "./driverLink";
import { DriversPage } from "../driversPage";

export function DriversRouter() {
  return (
    <>
      <Route path={DriverLink.index} element={<DriversPage />} />
    </>
  )
}