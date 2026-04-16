import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'

import { Message } from '../../message/entities/message.entity'

@Entity()
export class Chat {
	@PrimaryColumn({ length: 32 })
	id: string

	@Column({ length: 255 })
	title: string

	@OneToMany(() => Message, (message) => message.chat)
	messages: Message[]
}
