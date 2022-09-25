
import { IToastState } from 'components/Toast/store/Toast.model'

import { IProfileState } from './profile'

export interface IState {
	toast: IToastState
	profile: IProfileState
}
