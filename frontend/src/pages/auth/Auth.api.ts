import request, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import {
	handleAxiosError,
	handleNativeError,
	IGenericError
} from 'utils/utils'

export type ILoginFormInput = {
	email: string
	password: string
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
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.post(`${BASE_API}/auth/login`, payload)

		if (status === 200) callBack(data.userId, data.token)

		return {
			data,
			status,
			statusText,
			headers,
			config,
		}
	} catch (err) {
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const signup = async (
	payload: ISignupFormInput,
	callBack: (userId: string, token: string) => void
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.post(`${BASE_API}/auth/signup`, payload)

		if (status === 201) callBack(data.userId, data.token)

		return {
			data,
			status,
			statusText,
			headers,
			config
		}
	} catch (err) {
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const recoverPassword = async (
	email: string | undefined
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.post(`${BASE_API}/auth/recovery-password`, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const resetPassword = async ({
	password, token
}: IResetPassword): Promise<AxiosResponse | IGenericError> => {
	try {
		const url = `${BASE_API}/auth/reset-password/${token}`
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.post(url, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}




