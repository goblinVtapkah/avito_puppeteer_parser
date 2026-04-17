import { RouterProvider } from './providers/RouterProvider'
import { StoreProvider } from './providers/StoreProvider'
import { ThemeProvider } from './providers/ThemeProvider'

export const App = () => {
	return (
		<StoreProvider>
			<ThemeProvider>
				<RouterProvider />
			</ThemeProvider>
		</StoreProvider>
	)
}
