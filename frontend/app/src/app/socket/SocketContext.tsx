import { createContext, type RefObject } from 'react'
import { Socket } from 'socket.io-client'

export type SocketContextType = {
	socket: RefObject<Socket | null>
	connect: () => void
	disconnect: () => void
}

export const SocketContext = createContext<SocketContextType | null>(null)
