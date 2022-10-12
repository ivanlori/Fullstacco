import axios, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { handleError } from 'utils/utils'

export type ILoginFormInput = {
	email: string
	password: string
}

type LoginResponse = {
	token: string,
	userId: string
}

type IResetPassword = {
	password: string | undefined,
	token: string | undefined
}

export type ISignupFormInput = {
	name: string
	lastname: string
	username: string
	email: string
	password: string
}

export const login = async (
	payload: ILoginFormInput,
	callBack: (userId: string, token: string) => void
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.post<LoginResponse>(`${BASE_API}/auth/login`, payload)

		if (status === 200) callBack(data.userId, data.token)

		return {
			data,
			status,
			statusText,
			headers,
			config
		}
	} catch (err) {
		return handleError(err)
	}
}

export const signup = async (
	payload: ISignupFormInput
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.post(`${BASE_API}/auth/signup`, payload)

		return {
			data,
			status,
			statusText,
			headers,
			config
		}
	} catch (err) {
		return handleError(err)
	}
}

export const recoverPassword = async (
	email: string | undefined
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.post(`${BASE_API}/auth/recovery-password`, {
			email
		})

		return {
			data,
			status,
			statusText,
			headers,
			config
		}
	} catch (err) {
		return handleError(err)
	}
}

export const resetPassword = async ({
	password, token
}: IResetPassword): Promise<AxiosResponse> => {
	try {
		const url = `${BASE_API}/auth/reset-password/${token}`
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.post(url, {
			password
		})

		return {
			data,
			status,
			statusText,
			headers,
			config
		}
	} catch (err) {
		return handleError(err)
	}
}




