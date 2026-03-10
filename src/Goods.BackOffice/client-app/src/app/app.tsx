import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppBase } from '../shared/components/appBase';
import { Layout } from '../shared/components/layout';
import { DriversRouter } from './drivers/router/driversRouter';
import { InfrastructureRouter } from './infrastructure/router/infrastructureRouter';
import { ProductsRouter } from './products/router/productsRouter';
import { VehiclesRouter } from './vehicles/router/vehiclesRouter';

export function App() {
	return (
		<AppBase>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						{InfrastructureRouter()}
						{ProductsRouter()}
						{DriversRouter()}
						{VehiclesRouter()}
					</Route>
				</Routes>
			</BrowserRouter>
		</AppBase>
	);
}
