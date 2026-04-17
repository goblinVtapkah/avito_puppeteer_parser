import { Page } from 'puppeteer'
import { GetChannelsResponse, RefactorUser, TargetChat } from "../types/chat.types"
import { GetMessagesResponse, RefactorMessage } from '../types/message.types'
import { newMessage } from './api'

declare global {
	interface Window {
		onMutation: () => void
	}
}

export const getTargetChat = async (page: Page): Promise<TargetChat | null> => {

	// Получаем список чатов
	const channelsData: GetChannelsResponse = await page.evaluate(async () => {
		const result = await fetch("https://www.avito.ru/web/1/messenger/getChannels", {
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				limit: 30,
					filters: {
						excludeTags: [2, 3],
						anyTags: [],
					},
				category: 1,
			}),
			method: "POST",
		})
		
		return await result.json()
	})

	// перебираем чаты пока не найдём чат с искомым человеком
	for (const channel of channelsData.success.channels) {
		for (const user of channel.users) {
			if (user.name === process.env.ACCOUNT_NAME_FOR_CHAT_LISTEN) return {
				id: channel.id,
				profile: {
					id: user.id,
					name: user.name,
				},
				title: `${user.name} - ${(channel.context?.item?.value?.item?.title || '')}`
			}
		}
	}
	
	return null
}


export const getMessageHistory = async (
	page: Page,
	chatId: string,
	me: RefactorUser,
	interlocutor: RefactorUser,
): Promise<RefactorMessage[]> => {

	const messages = await page.evaluate(async ({ chatId, me, interlocutor }) => {

		const messages: RefactorMessage[] = []

		let hasMore = true
		const offsetTimestamp: { offsetTimestamp?: number } = {}

		// получаем постепенно все сообщения
		while (hasMore) {
			const result = await fetch("https://www.avito.ru/web/1/messenger/getUserVisibleMessages", {
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					channelId: chatId,
					limit: 100,
					order: 0,
					...offsetTimestamp,
				}),
				method: "POST",
			})
			const data: GetMessagesResponse = await result.json()

			data.success.messages.forEach((message, index) => {
				// игнорируем первое сообщение из всех запросов кроме первого
				// каждое первое сообщение из ответа запроса это последнее
				// сообщение из предыдущего запроса
				if (!index && messages.length) return
				
				// преобразуем сообщения в нужный вид
				messages.push({
					id: message.id,
					author: message.authorId === me.id ?
						me.name
						:
						message.authorId === interlocutor.id ?
							interlocutor.name
							:
							'system',
					text: message.body.text?.text ?? message.body.composite?.chunks?.[0]?.text?.text ?? '',
					createdAt: Math.floor(message.createdAt / 1000000)
				})

			})

			hasMore = data.success.hasMore
			offsetTimestamp.offsetTimestamp = data.success.messages[data.success.messages.length - 1].createdAt
		}

		return messages

	}, { chatId, me, interlocutor })

	return messages.reverse()
}

export const newMessageListen = async (
	page: Page,
	targetChat: TargetChat,
	profile: RefactorUser,
	messages: RefactorMessage[],
): Promise<void> => {
	// вызывается если на странице появляются новые сообщения
	await page.exposeFunction('onMutation', async () => {
		// массив из айдишников сообщени
		const messageIds = messages.map((message) => message.id)

		// делаем запросы по апи чтобы получить все данные о новых сообщениях
		const newMessages = await page.evaluate(async ({ messageIds, chatId, me, interlocutor }) => {
			const messages: RefactorMessage[] = []
			
			let hasMore = true
			const offsetTimestamp: { offsetTimestamp?: number } = {}
			
			// получаем постепенно все сообщения
			while (hasMore) {
				const result = await fetch("https://www.avito.ru/web/1/messenger/getUserVisibleMessages", {
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify({
						channelId: chatId,
						limit: 5,
						order: 0,
						...offsetTimestamp,
					}),
					method: "POST",
				})
				
				const data: GetMessagesResponse = await result.json()

				for (let index = 0; index < data.success.messages.length; index++) {
					const message = data.success.messages[index]
					// игнорируем первое сообщение из всех запросов кроме первого
					// каждое первое сообщение из ответа запроса это последнее
					// сообщение из предыдущего запроса
					if (!index && messages.length) continue
	
					// если дошли до сообщения, которое уже было
					if (messageIds.includes(message.id)) return messages
					
					// преобразуем сообщения в нужный вид
					messages.push({
						id: message.id,
						author: message.authorId === me.id ?
							me.name
							:
							message.authorId === interlocutor.id ?
								interlocutor.name
								:
								'system',
						text: message.body.text?.text ?? message.body.composite?.chunks?.[0]?.text?.text ?? '',
						createdAt: Math.floor(message.createdAt / 1000000)
					})

				}

				hasMore = data.success.hasMore
				offsetTimestamp.offsetTimestamp = data.success.messages[data.success.messages.length - 1].createdAt
			}

			return messages

		}, { messageIds, chatId: targetChat.id, me: profile, interlocutor: targetChat.profile })
		
		for (const message of newMessages) {
			if (!messageIds.includes(message.id)) {
				await newMessage(targetChat.id, message)
				messages.push(message)
				messageIds.push(message.id)
			}
		}
	})

	await page.evaluate(() => {
		const waitForElement = (selector: string) => new Promise(resolve => {
			const element = document.querySelector(selector)
			if (element) return resolve(element)
			
			const observer = new MutationObserver(() => {
				const element = document.querySelector(selector)
				if (element) {
					observer.disconnect()
					resolve(element)
				}
			})
			
			observer.observe(document.body, {
				childList: true,
				subtree: true
			})
		})
			
		waitForElement('[class*=messages-history-module-scrollContent]').then((element) => {
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.addedNodes.length) mutation.addedNodes.forEach((node) => {
						if ((node as HTMLElement).dataset.marker === 'message') window.onMutation()
					})
				})
			})
			
			observer.observe(element as Node, {
				childList: true,
				subtree: true
			})
		})
	})
}