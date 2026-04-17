import { Alert, CircularProgress, Container } from '@mui/material'
import { type FC } from 'react'

import { useGetChatsQuery } from '../../entities/chat'
import { Chat } from '../../entities/chat/ui/Chat'

export const HomePage: FC<{}> = ({}) => {
	const { data, isLoading } = useGetChatsQuery()
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				minHeight: '100%',
				padding: '50px',
				overflow: 'auto',
			}}
		>
			{isLoading ? (
				<CircularProgress />
			) : !data ? (
				<Alert>Ошибка загрузки чатов</Alert>
			) : data.length ? (
				data.map((chat) => <Chat key={chat.id} chat={chat} />)
			) : (
				<Alert severity="info">Пока нет чатов</Alert>
			)}
		</Container>
	)
}
