import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, CircularProgress } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { type FC, useEffect, useState } from 'react'

import { Message } from '../../message/ui/Message'
import { useGetChatByIdQuery } from '../api/apiSlice'
import { type Chat as ChatData } from '../model/types'
import { useSocket } from '../../../app/socket/useSocket'
import type { Message as MessageData } from '../../message/model/types'

interface Props {
	chat: ChatData
}

export const Chat: FC<Props> = ({ chat }: Props) => {
  	const { socket, connect } = useSocket()

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { data, isLoading } = useGetChatByIdQuery(chat.id, {
		skip: !isOpen,
	})
	const [newSocketMessages, setNewSocketMessages] = useState<MessageData[]>([])

	const messagesNotFiltered = [...(data?.messages || []), ...newSocketMessages]
	const messages: MessageData[] = []
	for (const message of messagesNotFiltered) {
		if (messages.includes(message)) continue
		messages.push(message)
	}

	useEffect(() => {connect()}, [connect])

	useEffect(() => {
		if (!socket.current) return
		if (isOpen) {
			socket.current.emit('joinRoom', { chatId: chat.id })
		}

		socket.current.on('message', (data: {
			message: MessageData,
			chatId: string,
		}) => {
			setNewSocketMessages([...newSocketMessages, data.message])
		})
		
		return () => {
			socket.current?.off('message')
		}
	}, [isOpen, socket])

	return (
		<Box>
			<Accordion
				expanded={isOpen}
				onChange={() => {
					setIsOpen(!isOpen)
				}}
			>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Box sx={{ textAlign: 'center' }}>
						<Typography sx={{ fontSize: '12px' }} component="h5">
							{chat.id}
						</Typography>
						<Typography component="h2">{chat.title}</Typography>
					</Box>
				</AccordionSummary>

				<AccordionDetails>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							rowGap: '15px',
							width: '500px',
							maxHeight: '500px',
							overflow: 'auto',
						}}
					>
						{isLoading ? (
							<CircularProgress />
						) : (
							messages
								.slice()
								.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
								.map((message) => <Message key={message.id} message={message} />)
						)}
					</Box>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}
