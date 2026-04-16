import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import { Chat } from '../../chat/entities/chat.entity'

@Entity()
export class Message {
	@PrimaryColumn({ length: 32 })
	id: string

	@Column()
	text: string

	@Column({ length: 255 })
	author: string

	@ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'chat_id' })
	chat: Chat
}
