import { Box } from '@mui/material'
import type { FC } from 'react'

import { ChatMessage } from '../../../shared/ui/ChatMessage'
import type { Message as MessageData } from '../model/types'

interface Props {
	message: MessageData
}

export const Message: FC<Props> = ({ message }: Props) => {
	return (
		<Box>
			<ChatMessage
				isOwn={message.author === (import.meta.env.VITE_ME_NAME || '')}
				author={message.author}
				text={message.text}
				time={message.created_at}
			/>
		</Box>
	)
}
