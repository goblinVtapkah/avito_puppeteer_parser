import { configureStore } from '@reduxjs/toolkit'

import { baseApi } from '../../shared/api/baseApi'

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

// типы
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
