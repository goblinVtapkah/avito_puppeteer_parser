import { Module } from '@nestjs/common'

import { MessageController } from './message.controller'
import { MessageService } from './message.service'
import { ChatGateway } from 'src/chat/chat.gateway'

@Module({
	imports: [],
	providers: [MessageService, ChatGateway],
	controllers: [MessageController],
})
export class MessageModule {}
