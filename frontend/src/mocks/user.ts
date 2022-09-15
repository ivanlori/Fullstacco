import { IUserState } from "types/user"

export const mockedAdminUser: IUserState = {
	email: 'user@email.com',
	name: 'Adam',
	lastname: 'Smith',
	username: 'Adam123',
	password: '123',
	createdAt: 'date',
	updatedAt: 'date',
	id: '123',
	role: 0,
	isActive: false,
	emailConfirmed: false,
}

export const mockedAccountUser: IUserState = {
	...mockedAdminUser,
	role: 1,
}
