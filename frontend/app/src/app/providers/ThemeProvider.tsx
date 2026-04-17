import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { type ReactNode } from 'react'

import { theme } from '../theme/theme'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	)
}
