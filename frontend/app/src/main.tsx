import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app/App'

declare global {
	interface ImportMeta {
		env: {
			VITE_API_HOST?: string
			VITE_API_PORT?: string
			VITE_ME_NAME?: string
		}
	}
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
