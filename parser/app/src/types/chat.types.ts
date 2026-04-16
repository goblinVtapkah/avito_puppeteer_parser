interface User {
	name: string
	id: string
}

export interface RefactorUser {
	name: string
	id: string
}

interface Context {
	item?: {
		value?: {
			item?: {
				title?: string
			}
		}
	}
}

interface Channel {
	id: string
	users: User[]
	context?: Context
}

export interface GetChannelsResponse {
	success: {
		channels: Channel[]
	}
}

export interface TargetChat {
	id: string
	profile: RefactorUser
	title: string | null
}