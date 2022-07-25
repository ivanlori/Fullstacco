import axios from 'axios'

import { BASE_API } from 'config'
import { handleError } from 'utils/utils'

export const signup = async (data: unknown) => {
	try {
		return await axios.post(`${BASE_API}/auth/signup`, data)
	} catch (err) {
		return handleError(err)
	}
}