import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBase } from '../shared/components/appBase';
import { Layout } from '../shared/components/layout';
import { DriversRouter } from './drivers/router/driversRouter';
import { InfrastructureRouter } from './infrastructure/router/infrastructureRouter';
import { VehiclesRouter } from './vehicles/router/vehiclesRouter';

export function App() {
	return (
		<AppBase>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						{InfrastructureRouter()}
						{DriversRouter()}
						{VehiclesRouter()}
					</Route>
				</Routes>
			</BrowserRouter>
		</AppBase>
	);
}
