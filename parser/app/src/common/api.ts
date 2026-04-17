import axios from 'axios'
import { RefactorMessage } from '../types/message.types'

const api = axios.create({
	baseURL: `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/api`,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
})

export const initializeChat = async (
	chatId: string,
	chatTitle: string,
	messages: RefactorMessage[]
): Promise<void> => {
	await api.post('/chat', {
		id: chatId,
		title: chatTitle
	})

	await api.post('/message/pull', {
		chatId,
		messages,
	})
}

export const newMessage = async (
	chatId: string,
	message: RefactorMessage,
): Promise<void> => {
	await api.post('/message', {
		chatId,
		...message,
	})
}