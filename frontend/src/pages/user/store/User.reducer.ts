import { ActionType } from 'types/user'

import userState from './User.state'
import * as type from './User.types'

const reducer = (state = userState, action: ActionType) => {
	switch (action.type) {
		case type.SET_USER:
			return action.payload
		default:
			break
	}

	return state
}

export default reducer
