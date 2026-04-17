import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

import { ChatService } from './chat.service'
import { CreateChatDto } from './dto/create-chat.dto'
import { Chat } from './entities/chat.entity'

@ApiTags('chat')
@Controller('chat')
export class ChatController {
	constructor(private chatService: ChatService) {}

	@Post()
	@ApiOperation({ summary: 'Create chat' })
	@ApiResponse({ status: 200, description: 'Chat created' })
	create(@Body() createChatDto: CreateChatDto): Promise<Chat> {
		return this.chatService.create(createChatDto)
	}

	@Get()
	@ApiOperation({ summary: 'Get chat list' })
	@ApiResponse({ status: 200, description: 'Chat list' })
	findAll(): Promise<Chat[]> {
		return this.chatService.findAll()
	}

	@Get(':chat_id')
	@ApiOperation({ summary: 'Get chat with messages' })
	@ApiResponse({ status: 200, description: 'chat with messages' })
	find(@Param('chat_id') chatId: string): Promise<Chat> {
		return this.chatService.find(chatId)
	}
}
