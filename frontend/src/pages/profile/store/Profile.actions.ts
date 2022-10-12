import { IProfileState } from 'types/profile'

import { RESET_PROFILE, SET_PROFILE } from './Profile.types'

export const setProfile = (payload: IProfileState) => ({
	type: SET_PROFILE,
	payload,
})

export const resetProfile = () => ({
	type: RESET_PROFILE
})
