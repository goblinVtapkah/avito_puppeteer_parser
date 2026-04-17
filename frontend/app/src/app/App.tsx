import { RouterProvider } from './providers/RouterProvider'
import { SocketProvider } from './providers/SocketProvider'
import { StoreProvider } from './providers/StoreProvider'
import { ThemeProvider } from './providers/ThemeProvider'

export const App = () => {
	return (
		<StoreProvider>
			<ThemeProvider>
				<SocketProvider>
					<RouterProvider />
				</SocketProvider>
			</ThemeProvider>
		</StoreProvider>
	)
}
