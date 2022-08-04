import axios, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { handleError } from 'utils/utils'

export type IFormInput = {
	email: string
	password: string
}

export type LoginResponse = {
	token: string,
	userId: string
}

export const login = async (
	payload: IFormInput
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.post<LoginResponse>(`${BASE_API}/auth/login`, payload)

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



