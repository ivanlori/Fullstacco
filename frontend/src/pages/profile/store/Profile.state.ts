import { IProfileState } from "types/profile"

export const initialState: IProfileState = {
	name: '',
	lastname: '',
	username: '',
	email: '',
	photoUrl: '',
	password: '',
	createdAt: '',
	updatedAt: '',
	_id: '',
	role: 0,
	emailConfirmed: false,
	isActive: false
}
