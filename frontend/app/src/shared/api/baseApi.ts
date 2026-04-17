import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `http://${import.meta.env.VITE_API_HOST || ''}:${import.meta.env.VITE_API_PORT || ''}/api`,
		credentials: 'include',
		prepareHeaders: (headers) => {
			headers.set('Content-Type', `application/json`)
			return headers
		},
	}),
	endpoints: () => ({}),
})
