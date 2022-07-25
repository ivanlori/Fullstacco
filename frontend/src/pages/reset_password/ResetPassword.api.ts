import axios from 'axios'

import { BASE_API } from 'config'
import { handleError } from 'utils/utils'

type IResetPassword = {
	password: string | undefined,
	token: string | undefined
}

export const recoverPassword = async (email: string | undefined) => {
	try {
		return await axios.post(`${BASE_API}/auth/recovery-password`, {
			email
		})
	} catch (err) {
		return handleError(err)
	}
}

export const resetPassword = async ({ password, token }: IResetPassword) => {
	try {
		const url = `${BASE_API}/auth/reset-password/${token}`
		return await axios.post(url, {
			password
		})
	} catch (err) {
		return handleError(err)
	}
}