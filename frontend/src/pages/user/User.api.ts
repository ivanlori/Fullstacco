import axios from 'axios'

import { BASE_API } from 'config'
import { getToken, handleError } from 'utils/utils'

import { IUserState } from './store/User.models'

export const createUser = async (data: IUserState) => {
	try {
		return await axios.post(`${BASE_API}/users/create`, data, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
		})
	} catch (err) {
		return handleError(err)
	}
}

export const getUsers = async () => {
	try {
		const { data } = await axios.get(`${BASE_API}/users/`, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
		})

		return data
	} catch (err) {
		return handleError(err)
	}
}

export const updateUser = async (id: string | undefined, data: IUserState) => {
	try {
		return await axios.patch(`${BASE_API}/users/${id}`, data, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
		})
	} catch (err) {
		return handleError(err)
	}
}

export const getUser = async (id: string | null) => {
	try {
		const { data } = await axios.get(`${BASE_API}/users/${id}`, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
		})
		return data
	} catch (err) {
		return handleError(err)
	}
}

export const deleteUser = async (id: string | undefined) => {
	try {
		return await axios.delete(`${BASE_API}/users/${id}`, {
			headers: {
				'Authorization': `Bearer ${getToken()}`
			}
		})
	} catch (err) {
		return handleError(err)
	}
}