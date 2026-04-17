import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class CreateChatDto {
	@ApiProperty({ type: String })
	@IsString()
	@Length(5, 32)
	id: string

	@ApiProperty({ type: String })
	@IsString()
	@Length(0, 255)
	title: string
}
