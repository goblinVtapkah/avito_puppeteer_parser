import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { CreateMessageDto } from './dto/create-message.dto'
import { Message } from './entities/message.entity'
import { MessageService } from './message.service'

@Controller('message')
export class MessageController {
	constructor(private messageService: MessageService) {}

	@Post()
	create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
		return this.messageService.create(createMessageDto)
	}
}
