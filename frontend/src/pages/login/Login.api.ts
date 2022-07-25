import axios from 'axios'

import { BASE_API } from 'config'
import { handleError } from 'utils/utils'

export type IFormInput = {
	email: string
	password: string
}

export const login = async (data: IFormInput) => {
	try {
		return await axios.post(`${BASE_API}/auth/login`, data)
	} catch (err) {
		return handleError(err)
	}
}



