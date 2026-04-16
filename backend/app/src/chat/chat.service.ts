import { Injectable, NotFoundException } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { CreateChatDto } from './dto/create-chat.dto'
import { Chat } from './entities/chat.entity'

@Injectable()
export class ChatService {
	private chatRepository: Repository<Chat>

	constructor(private dataSource: DataSource) {
		this.chatRepository = this.dataSource.getRepository(Chat)
	}

	create(createChatDto: CreateChatDto): Promise<Chat> {
		const chat = this.chatRepository.create(createChatDto)
		return this.chatRepository.save(chat)
	}

	findAll(): Promise<Chat[]> {
		return this.chatRepository.find()
	}

	async find(chatId: string): Promise<Chat> {
		const chat = await this.chatRepository.findOne({
			where: {
				id: chatId,
			},
			relations: {
				messages: true,
			},
		})

		if (!chat) throw new NotFoundException('Chat not found')

		return chat
	}
}
