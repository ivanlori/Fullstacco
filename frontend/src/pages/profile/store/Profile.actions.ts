import { IProfileState, idProfileModelAction } from 'types/profile'

import { SET_ID_PROFILE, SET_PROFILE } from './Profile.types'

export const setProfile = (payload: IProfileState) => ({
	type: SET_PROFILE,
	payload,
})

export const setIdProfile = (payload: string): idProfileModelAction => ({
	type: SET_ID_PROFILE,
	payload,
})
