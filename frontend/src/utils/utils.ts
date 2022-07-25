import { AxiosError } from "axios"

import { IUserState } from "pages/user/store/User.models"

export const isAuthenticated = () => (
	localStorage.getItem('tk') && localStorage.getItem('userId') ? true : false
)

export const getUserId = () => localStorage.getItem('userId')

export const getToken = () => localStorage.getItem('tk')

export const isAdmin = (user: IUserState) => user.role === 0

export const isAccount = (user: IUserState) => user.role === 1

export const handleError = (err: unknown) => {
	const error = err as AxiosError

	if (error.response) {
		return error.response
	}
}