
import { IToastState } from 'components/Toast/store/Toast.model'

import { IProfileState } from './profile'

export interface IState {
	toastReducer: IToastState
	profileReducer: IProfileState
}
