import {
	TOAST_DISPLAYED,
	TOAST_HIDDEN,
} from './Toast.types'

export interface IToastState {
	text: string,
	style: 'error' | 'success' | null,
}

export type State = IToastState

export interface displayToastModel {
	type: typeof TOAST_DISPLAYED,
	payload: IToastState
}

export interface toastHiddenModel {
	type: typeof TOAST_HIDDEN
}

export type ActionType = displayToastModel & toastHiddenModel
