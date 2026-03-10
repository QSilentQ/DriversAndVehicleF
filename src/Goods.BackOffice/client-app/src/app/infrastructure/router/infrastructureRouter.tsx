import React from 'react';
import { Route } from 'react-router-dom';
import { InfrastructureLink } from './infrastructureLink';
import { DriversPage } from '../../drivers/driversPage';

export function InfrastructureRouter() {
	return (
		<>
			<Route path={InfrastructureLink.index} element={<DriversPage />} />
		</>
	);
}
