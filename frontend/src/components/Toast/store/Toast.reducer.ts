import { ActionType } from './Toast.model'
import { initialState } from './Toast.state'
import {
	TOAST_DISPLAYED,
	TOAST_HIDDEN,
} from './Toast.types'

export const toastReducer = (state = initialState, action: ActionType) => {
	const { payload } = action
	switch (action.type) {
		case TOAST_DISPLAYED:
			return {
				text: payload.text,
				style: payload.style,
			}
		case TOAST_HIDDEN:
			return {
				text: '',
				style: '',
			}
		default:
			return state
	}
}
