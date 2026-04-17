import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { Message } from 'src/message/entities/message.entity'

@WebSocketGateway({
	cors: {
		origin: '*',
	},
})
export class ChatGateway {
	@WebSocketServer()
	server: Server

	handleConnection(client: Socket) {
		console.log('connected:', client.id)
	}

	handleDisconnect(client: Socket) {
		console.log('disconnected:', client.id)
	}

	@SubscribeMessage('joinRoom')
	handleJoinRoom(
		@MessageBody() data: { chatId: string },
		@ConnectedSocket() client: Socket,
	) {
		client.join(data.chatId)

		client.emit('joinedRoom', {
			chatId: data.chatId,
		})
	}

	handleMessage(
		@MessageBody() data: { chatId: string; message: Message },
	) {
		this.server.to(data.chatId).emit('message', {
			message: data.message,
			chatId: data.chatId,
		})
	}
}
