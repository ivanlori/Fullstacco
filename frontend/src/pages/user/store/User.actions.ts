import { idUserModelAction, IUserState } from 'types/user'

import { SET_USER, SET_ID_USER } from './User.types'

export const setUser = (payload: IUserState) => ({
	type: SET_USER,
	payload,
})

export const setIdUser = (payload: string): idUserModelAction => ({
	type: SET_ID_USER,
	payload,
})
