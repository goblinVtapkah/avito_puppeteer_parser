import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ChatModule } from './chat/chat.module'
import { typeOrmConfig } from './database/typeorm.config'
import { MessageModule } from './message/message.module'

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig()), ChatModule, MessageModule],
})
export class AppModule {}
