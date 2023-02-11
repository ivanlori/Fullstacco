import { displayToastModel, toastHiddenModel } from "./Toast.model"
import { TOAST_DISPLAYED, TOAST_HIDDEN } from "./Toast.types"

export const toastHiddenAction = (): toastHiddenModel => ({
	type: TOAST_HIDDEN
})

export const displayToast = (
	text: string,
	style: 'error' | 'success',
): displayToastModel => ({
	type: TOAST_DISPLAYED,
	payload: {
		text,
		style,
	}
})
