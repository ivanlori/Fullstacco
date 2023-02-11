import { AxiosError } from "axios"

import { IProfileState } from "types/profile"

export const USER_ID_STORAGE = 'userId'
export const TOKEN_STORAGE = 'tk'

export type IGenericError = {
	status: string
	message: string
	data: unknown
}

export const getUserId = () => localStorage.getItem(USER_ID_STORAGE)

export const isAuthenticated = () => getToken() && getUserId()

export const getToken = () => localStorage.getItem(TOKEN_STORAGE)

export const isAdmin = (user: IProfileState) => user.role === 0

export const isAccount = (user: IProfileState) => user.role === 1

export const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const isEmail = (email: string) => {
	return emailReg.test(email)
}

export const handleAxiosError = (error: AxiosError) => {
	return {
		status: error.status as string,
		message: error.message,
		data: error.response
	}
}

export const handleNativeError = (): IGenericError => {
	return {
		status: '400',
		message: 'generic_error',
		data: {}
	}
}

export const getRoleLabelId = (role: number) => {
	let idLabel = ''

	if (role === 0) {
		idLabel = 'role.admin'
	} else if (role === 1) {
		idLabel = 'role.account'
	} else {
		idLabel = 'role.superAdmin'
	}

	return idLabel
}
