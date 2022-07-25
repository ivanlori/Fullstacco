import { IUserState } from './User.models'

const initialState: IUserState = {
	email: '',
	name: '',
	lastname: '',
	username: '',
	password: '',
	createdAt: '',
	updatedAt: '',
	id: '',
	role: 0,
	isActive: false,
	emailConfirmed: false
}

export default initialState
