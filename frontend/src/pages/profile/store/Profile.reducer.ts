import { ActionType } from 'types/profile'

import profileState from './Profile.state'
import * as types from './Profile.types'

const reducer = (state = profileState, action: ActionType) => {
	switch (action.type) {
		case types.SET_PROFILE:
			return action.payload
		case types.RESET_PROFILE:
			return state = profileState
		default:
			break
	}

	return state
}

export default reducer
