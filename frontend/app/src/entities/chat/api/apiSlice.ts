import { baseApi } from '../../../shared/api/baseApi'
import type { Chat } from '../model/types'

export const chatApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getChats: builder.query<Chat[], void>({
			query: () => '/chat',
		}),

		getChatById: builder.query<Chat, string>({
			query: (id) => `/chat/${id}`,
		}),
	}),
})

export const { useGetChatsQuery, useGetChatByIdQuery } = chatApi
