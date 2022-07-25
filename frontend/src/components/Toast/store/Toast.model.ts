import {
	TOAST_DISPLAYED,
	TOAST_HIDDEN,
} from './Toast.types'

export interface IToastState {
	text: string,
	style: 'error' | 'success' | null,
}

export interface State {
	text: string
	style: 'error' | 'success'
}

export interface displayToastModel {
	type: typeof TOAST_DISPLAYED,
	text: string
	style: 'error' | 'success'
}

export interface toastHiddenModel {
	type: typeof TOAST_HIDDEN
}

export type ActionType = displayToastModel & toastHiddenModel