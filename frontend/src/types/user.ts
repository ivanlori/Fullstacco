import * as types from '../pages/user/store/User.types'

export interface IUserState {
	email: string
	name: string
	lastname: string
	username: string
	password?: string
	updatedAt?: string
	createdAt?: string
	id?: string
	isActive: boolean
	role: number | undefined
	emailConfirmed: boolean
}

export type IRoleSelection = {
	value: number | undefined,
	label: string | undefined
}

export interface emailModel {
	type: typeof types.SET_EMAIL;
	payload: string;
}

export interface idUserModelAction {
	type: typeof types.SET_ID_USER;
	payload: string;
}

export interface userModelAction {
	type: typeof types.SET_USER;
	payload: IUserState;
}

export type ActionType = emailModel | idUserModelAction | userModelAction
