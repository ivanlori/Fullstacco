import { IProfileState } from "types/profile"

export const mockedAdminUser: IProfileState = {
	email: 'user@email.com',
	name: 'Adam',
	lastname: 'Smith',
	username: 'Adam123',
	password: '123',
	createdAt: 'date',
	updatedAt: 'date',
	id: '123',
	photoUrl: 'some_url',
	role: 0,
	emailConfirmed: false,
}

export const mockedAccountUser: IProfileState = {
	...mockedAdminUser,
	role: 1,
}
