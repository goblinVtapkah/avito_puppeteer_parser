import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app/App'

declare global {
	interface ImportMeta {
		env: {
			VITE_API_URL?: string
			VITE_ME_NAME?: string
			VITE_WS_URL?: string
		}
	}
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
