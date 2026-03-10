import React from 'react';
import { Route } from 'react-router-dom';
import { VehicleLink } from './vehicleLink';
import { VehiclesPage } from '../vehiclesPage';

export function VehiclesRouter() {
	return (
		<>
			<Route path={VehicleLink.index} element={<VehiclesPage />} />
		</>
	);
}
