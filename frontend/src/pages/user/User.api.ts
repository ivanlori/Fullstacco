import axios, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { IProfileState, IUserState } from 'types/profile'
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

export const fetchUsers = async (
	page: number,
	limit: number
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.get(`${BASE_API}/users/?page=${page}&limit=${limit}`, {
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
	payload: IProfileState
): Promise<AxiosResponse> => {
	const url = `${BASE_API}/users/${(payload._id)}`
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

export const changeUserStatus = async (
	id: string,
	activate: boolean
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.patch(`${BASE_API}/users/${id}/activate`, {
			activate
		}, {
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
