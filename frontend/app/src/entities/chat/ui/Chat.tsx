import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, CircularProgress } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import { type FC, useState } from 'react'

import { Message } from '../../message/ui/Message'
import { useGetChatByIdQuery } from '../api/apiSlice'
import { type Chat as ChatData } from '../model/types'

interface Props {
	chat: ChatData
}

export const Chat: FC<Props> = ({ chat }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const { data } = useGetChatByIdQuery(chat.id, {
		skip: !isOpen,
	})

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
						{data ? (
							data.messages
								.slice()
								.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
								.map((message) => (
									<Message
										key={message.id}
										message={message}
									/>
								))
						) : (
							<CircularProgress />
						)}
					</Box>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}
