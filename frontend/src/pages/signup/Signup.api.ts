import axios, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { handleError } from 'utils/utils'

export interface IFormInput {
	name: string
	lastname: string
	username: string
	email: string
	password: string
}

export const signup = async (payload: IFormInput): Promise<AxiosResponse> => {
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
