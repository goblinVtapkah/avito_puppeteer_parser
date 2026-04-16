import { Injectable, NotFoundException } from '@nestjs/common'
import { Chat } from 'src/chat/entities/chat.entity'
import { DataSource, Repository } from 'typeorm'

import { CreateMessageDto } from './dto/create-message.dto'
import { Message } from './entities/message.entity'

@Injectable()
export class MessageService {
	private messageRepository: Repository<Message>
	private chatRepository: Repository<Chat>

	constructor(private dataSource: DataSource) {
		this.messageRepository = this.dataSource.getRepository(Message)
		this.chatRepository = this.dataSource.getRepository(Chat)
	}

	async create(createMessageDto: CreateMessageDto): Promise<Message> {
		const chat = await this.chatRepository.findOneBy({ id: createMessageDto.chatId })

		if (!chat) throw new NotFoundException('Chat not found')

		const message = this.messageRepository.create({
			id: createMessageDto.id,
			text: createMessageDto.text,
			author: createMessageDto.author,
			chat,
		})

		return await this.messageRepository.save(message)
	}
}
