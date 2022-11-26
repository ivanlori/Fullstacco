import { ActionType } from 'types/profile'

import { initialState } from './Profile.state'
import * as types from './Profile.types'

export const profileReducer = (state = initialState, action: ActionType) => {
	switch (action.type) {
		case types.SET_PROFILE:
			return action.payload
		case types.RESET_PROFILE:
			return state = initialState
		default:
			break
	}

	return state
}
