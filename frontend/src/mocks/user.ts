import { IProfileState } from "types/profile"

export const mockedAdminUser: IProfileState = {
	email: 'user@email.com',
	name: 'Adam',
	lastname: 'Smith',
	username: 'Adam123',
	password: '123',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	_id: '123',
	photoUrl: 'some_url',
	role: 0,
	emailConfirmed: false,
	isActive: true
}

export const mockedAccountUser: IProfileState = {
	...mockedAdminUser,
	role: 1,
}
