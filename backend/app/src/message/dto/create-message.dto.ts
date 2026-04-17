import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsArray, IsDate, IsString, Length, ValidateNested } from 'class-validator'

class BaseMessageDto {
	@ApiProperty({ type: String })
	@IsString()
	@Length(5, 32)
	id: string

	@ApiProperty({ type: String })
	@IsString()
	text: string

	@ApiProperty({ type: String })
	@IsString()
	@Length(1, 255)
	author: string

	@ApiProperty({ type: Number, description: 'timestamp', example: '1776384899091' })
	@Transform(({ value }) => new Date(value))
	@IsDate()
	createdAt: Date
}

export class CreateMessageDto extends BaseMessageDto {
	@ApiProperty({ type: String })
	@IsString()
	@Length(5, 32)
	chatId: string
}

export class UploadPullMessageDto {
	@ApiProperty({ type: String })
	@IsString()
	@Length(5, 32)
	chatId: string

	@ApiProperty({ type: [BaseMessageDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => BaseMessageDto)
	messages: BaseMessageDto[]
}
