import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				html: {
					height: '100%',
				},
				body: {
					height: '100%',
					margin: 0,
				},
				'#root': {
					height: '100%',
				},
			},
		},
	},
})
