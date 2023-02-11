import request, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import {
	getToken,
	handleAxiosError,
	handleNativeError,
	IGenericError
} from 'utils/utils'

export const uploadPhoto = async (
	id: string,
	payload: { photo: FormDataEntryValue | null }
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.patch(`${BASE_API}/users/${id}/photo`, payload,
			{
				headers: {
					'Authorization': `Bearer ${getToken()}`,
					'Content-Type': 'multipart/form-data'
				},
			}
		)

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

export const removePhoto = async (
	id: string
): Promise<AxiosResponse | IGenericError> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await request.delete(`${BASE_API}/users/${id}/photo`,
			{
				headers: {
					'Authorization': `Bearer ${getToken()}`,
				},
			}
		)

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
