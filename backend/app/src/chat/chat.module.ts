import { Module } from '@nestjs/common'

import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'

@Module({
	imports: [],
	providers: [ChatService, ChatGateway],
	controllers: [ChatController],
	exports: [ChatService, ChatGateway],
})
export class ChatModule {}
