import { AppBar, Box, Button } from '@mui/material';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export function Layout() {
	return (
		<>
			<AppBar position='fixed' sx={{ height: 64 }}>
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						height: '100%',
						alignItems: 'center',
						gap: 4,
						paddingX: 2
					}}>
					<Button component={Link} to="/drivers" sx={{ height: '100%', boxShadow: 'none' }} variant="contained">Водители</Button>
					<Button component={Link} to="/vehicles" sx={{ height: '100%', boxShadow: 'none' }} variant="contained">Транспортные средства</Button>
				</Box>
			</AppBar>
			<Box
				sx={{
					width: '100%',
					height: '100%',
					paddingTop: 10,
					paddingBottom: 2,
					paddingX: 2
				}}>
				<Outlet />
			</Box>
		</>
	);
}