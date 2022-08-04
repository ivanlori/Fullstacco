import axios, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { handleError } from 'utils/utils'

type IResetPassword = {
	password: string | undefined,
	token: string | undefined
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
