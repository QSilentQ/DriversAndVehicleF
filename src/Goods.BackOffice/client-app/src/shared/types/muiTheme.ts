import { createTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';

export const MuiTheme = createTheme(
	{
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					html: {
						width: '100%',
						height: '100%'
					},
					body: {
						width: '100%',
						height: '100%'
					},
					'#root': {
						width: '100%',
						height: '100%',
						overflow: 'hidden'
					},

					'::-webkit-scrollbar': {
						width: '6px',
						height: '6px'
					},

					'::-webkit-scrollbar-thumb': {
						backgroundColor: '#cecece',
						borderRadius: '4px'
					}
				}
			},
			MuiButton: {
				styleOverrides: {
					root: {
						lineHeight: 'normal'
					}
				}
			}
		}
	},
	ruRU
);
