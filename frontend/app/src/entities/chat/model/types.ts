import type { Message } from '../../message/model/types'

export interface Chat {
	id: string

	title: string

	messages: Message[]
}
