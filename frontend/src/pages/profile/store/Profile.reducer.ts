import { ActionType } from 'types/profile'

import profileState from './Profile.state'
import * as types from './Profile.types'

const reducer = (state = profileState, action: ActionType) => {
	switch (action.type) {
		case types.SET_PROFILE:
			return action.payload
		default:
			break
	}

	return state
}

export default reducer
