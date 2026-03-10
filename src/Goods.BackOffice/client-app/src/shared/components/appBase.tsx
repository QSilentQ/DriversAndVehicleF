//#region Globals

import 'tools/globals/string';

//#endregion

import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { MuiTheme } from '../types/muiTheme';

export function AppBase(props: PropsWithChildren) {
	return (
		<ThemeProvider theme={MuiTheme}>
			<CssBaseline />
			{props.children}
		</ThemeProvider>
	);
}
