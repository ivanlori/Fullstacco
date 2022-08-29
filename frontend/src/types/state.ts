
import { IToastState } from 'components/Toast/store/Toast.model'
import {
	IUserState
} from 'types/user'

export interface IState {
	user: IUserState,
	toast: IToastState
}
