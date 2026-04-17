import { type ReactNode, useRef } from 'react'
import { type Socket, io } from 'socket.io-client'

import { SocketContext } from '../socket/SocketContext'

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const socketRef = useRef<Socket | null>(null)

	const connect = () => {
		if (socketRef.current) return

		const socket = io(
			`https://${import.meta.env.VITE_API_URL || ''}`,
			{
				withCredentials: true,
				transports: ['websocket', 'polling'],
			},
		)
		socket.connect()

		socketRef.current = socket
	}

	const disconnect = () => {
		socketRef.current?.disconnect()
		socketRef.current = null
	}

	return (
		<SocketContext.Provider
			value={{
				socket: socketRef,
				connect,
				disconnect,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}
