export interface RefactorMessage {
	id: string
	author: string
	text: string
	createdAt: number
}

interface Message {
	id: string
	authorId: string
	body: {
		text?: {
			text: string
		}
		composite?: {
			chunks?: {
				text?: {
					text?: string
				}
			}[]
		}
	}
	createdAt: number
}

export interface GetMessagesResponse {
	success: {
		messages: Message[]
		hasMore: boolean
	}
}