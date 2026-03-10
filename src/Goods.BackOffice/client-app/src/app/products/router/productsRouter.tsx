import React from 'react';
import { Route } from 'react-router-dom';
import { ProductsPage } from '../productsPage';
import { ProductLink } from './productLink';

export function ProductsRouter() {
	return (
		<>
			<Route path={ProductLink.index} element={<ProductsPage />} />
		</>
	);
}
