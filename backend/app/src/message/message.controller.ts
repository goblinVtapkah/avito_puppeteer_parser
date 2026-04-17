import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Chat } from 'src/chat/entities/chat.entity'

import { CreateMessageDto, UploadPullMessageDto } from './dto/create-message.dto'
import { Message } from './entities/message.entity'
import { MessageService } from './message.service'

@ApiTags('message')
@Controller('message')
export class MessageController {
	constructor(private messageService: MessageService) {}

	@Post()
	@ApiOperation({ summary: 'Create message' })
	@ApiResponse({ status: 200, description: 'Message created' })
	create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
		return this.messageService.create(createMessageDto)
	}

	@Post('pull')
	@ApiOperation({ summary: 'Upload pull messages for chat' })
	@ApiResponse({ status: 200, description: 'Messages uploaded' })
	uploadPull(@Body() uploadPullMessageDto: UploadPullMessageDto): Promise<Chat> {
		return this.messageService.uploadPull(uploadPullMessageDto)
	}
}
