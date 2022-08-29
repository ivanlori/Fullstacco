import { AxiosError, AxiosResponse } from "axios"

import { IUserState } from "types/user"

export const getUserId = () => localStorage.getItem('userId')

export const isAuthenticated = () => getToken() && getUserId()

export const getToken = () => localStorage.getItem('tk')

export const isAdmin = (user: IUserState) => user.role === 0

export const isAccount = (user: IUserState) => user.role === 1

export const handleError = (err: unknown): AxiosResponse<unknown, unknown> => {
	const error = err as AxiosError

	return error.response as AxiosResponse<unknown, unknown>
}
