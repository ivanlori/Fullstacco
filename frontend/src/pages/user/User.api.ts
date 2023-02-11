import request, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { IProfilePayload } from 'types/profile'
import {
	getToken,
	handleAxiosError,
	handleNativeError,
	IGenericError
} from 'utils/utils'

export const createUser = async (
	payload: IProfilePayload
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.post(`${BASE_API}/users/create`, payload, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const fetchUsers = async (
	page: number,
	limit: number
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.get(`${BASE_API}/users/?page=${page}&limit=${limit}`, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const updateUser = async (
	payload: IProfilePayload
): Promise<AxiosResponse | IGenericError> => {
	const url = `${BASE_API}/users/${(payload._id)}`
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.patch(url, payload, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const getUser = async (
	id: string | null
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.get(`${BASE_API}/users/${id}`, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const deleteUser = async (
	id: string | undefined
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.delete(`${BASE_API}/users/${id}`, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}

export const changeUserStatus = async (
	id: string,
	activate: boolean
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.patch(`${BASE_API}/users/${id}/activate`, {
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
		if (request.isAxiosError(err)) {
			return handleAxiosError(err)
		} else {
			return handleNativeError()
		}
	}
}
