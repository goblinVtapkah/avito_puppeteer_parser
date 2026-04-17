import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: `https://${import.meta.env.VITE_API_URL || ''}/api`,
		credentials: 'include',
		prepareHeaders: (headers) => {
			headers.set('Content-Type', `application/json`)
			return headers
		},
	}),
	endpoints: () => ({}),
})
