import { AxiosError, AxiosResponse } from "axios"

import { IProfileState } from "types/profile"

export const USER_ID_STORAGE = 'userId'
export const TOKEN_STORAGE = 'tk'

export const getUserId = () => localStorage.getItem(USER_ID_STORAGE)

export const isAuthenticated = () => getToken() && getUserId()

export const getToken = () => localStorage.getItem(TOKEN_STORAGE)

export const isAdmin = (user: IProfileState) => user.role === 0

export const isAccount = (user: IProfileState) => user.role === 1

export const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

export const isEmail = (email: string) => {
	return emailReg.test(email)
}

export const handleError = (err: unknown): AxiosResponse<unknown, unknown> => {
	const error = err as AxiosError

	return error.response as AxiosResponse<unknown, unknown>
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
