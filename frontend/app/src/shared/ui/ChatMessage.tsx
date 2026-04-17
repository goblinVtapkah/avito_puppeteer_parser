import { Avatar, Box, Paper, Stack, Typography } from '@mui/material'

type ChatMessageProps = {
	text: string
	author: string
	avatarUrl?: string
	isOwn?: boolean
	time?: string
}

export function ChatMessage({ text, author, avatarUrl, isOwn = false, time }: ChatMessageProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: isOwn ? 'flex-end' : 'flex-start',
				mb: 1,
			}}
		>
			<Stack
				direction={isOwn ? 'row-reverse' : 'row'}
				spacing={1}
				sx={{
					alignItems: 'flex-end',
					maxWidth: '70%',
				}}
			>
				<Avatar src={avatarUrl}>{author[0]}</Avatar>

				<Paper
					elevation={1}
					sx={{
						p: 1.2,
						px: 1.5,
						borderRadius: 2,
						bgcolor: isOwn ? 'primary.main' : 'grey.100',
						color: isOwn ? 'primary.contrastText' : 'text.primary',
					}}
				>
					<Typography variant="body2">{text}</Typography>

					{time && (
						<Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7 }}>
							{time}
						</Typography>
					)}
				</Paper>
			</Stack>
		</Box>
	)
}
