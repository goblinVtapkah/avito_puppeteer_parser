import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { Chat } from './entities/chat.entity'

@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	@Post()
	create(@Body() createChatDto: CreateChatDto): Promise<Chat> {
		return this.chatService.create(createChatDto)
	}

	@Get()
	findAll(): Promise<Chat[]> {
		return this.chatService.findAll()
	}

	@Get(':chat_id')
	find(@Param('chat_id') chatId: string): Promise<Chat> {
		return this.chatService.find(chatId)
	}
}
