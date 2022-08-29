import axios, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { IUserState } from 'types/user'
import { getToken, handleError } from 'utils/utils'


export const createUser = async (
	payload: IUserState
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.post(`${BASE_API}/users/create`, payload, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
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

export const getUsers = async (): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.get(`${BASE_API}/users/`, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
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

export const updateUser = async (
	payload: IUserState
): Promise<AxiosResponse> => {
	const url = `${BASE_API}/users/${(payload.id)}`
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.patch(url, payload, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
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

export const getUser = async (id: string | null): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.get(`${BASE_API}/users/${id}`, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
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

export const deleteUser = async (
	id: string | undefined
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.delete(`${BASE_API}/users/${id}`, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
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
