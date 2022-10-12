import * as types from '../pages/profile/store/Profile.types'

export interface IProfileState {
	name: string
	lastname: string
	username: string
	email: string
	photoUrl: string
	password?: string
	updatedAt?: string
	createdAt?: string
	id?: string
	role: number | undefined
	emailConfirmed: boolean
	isActive: boolean
}

export interface IUserState extends IProfileState {
	isActive: boolean
}

export type IPhotoUrlPayload = {
	url: string
}

export type IProfileAction = {
	type: typeof types.SET_PROFILE
	payload: IProfileState
}

export type IRoleSelection = {
	id: number,
	value: string
}

export interface resetProfileModelAction {
	type: typeof types.RESET_PROFILE;
	payload: string;
}

export type ActionType = IProfileAction | resetProfileModelAction
