import axios, { AxiosResponse } from 'axios'

import { BASE_API } from 'config'
import { getToken, handleError } from 'utils/utils'

export const uploadPhoto = async (
	id: string,
	payload: { photo: FormDataEntryValue | null }
): Promise<AxiosResponse> => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.patch(`${BASE_API}/users/${id}/photo`, payload,
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
		return handleError(err)
	}
}

export const removePhoto = async (id: string) => {
	try {
		const {
			data,
			status,
			statusText,
			headers,
			config
		} = await axios.delete(`${BASE_API}/users/${id}/photo`,
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
		return handleError(err)
	}
}
