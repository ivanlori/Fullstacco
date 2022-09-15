import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import { mockedAdminUser } from 'mocks/user'
import {
	renderWithProviders
} from 'utils/testing-library-utils'

import UserForm from '../_components/UserForm'

describe('UserForm', () => {

	test('should display common fields', () => {
		renderWithProviders(
			<MemoryRouter>
				<UserForm user={mockedAdminUser} />
			</MemoryRouter>,
			{
				withIntl: true
			}
		)

		const name = screen.getByTestId(DataTestKeys.userFormName)
		const lastname = screen.getByTestId(DataTestKeys.userFormLastname)
		const username = screen.getByTestId(DataTestKeys.userFormUsername)
		const email = screen.getByTestId(DataTestKeys.userFormEmail)

		expect(name).toBeInTheDocument()
		expect(lastname).toBeInTheDocument()
		expect(username).toBeInTheDocument()
		expect(email).toBeInTheDocument()
	})

	test('should display user edit fields', () => {
		renderWithProviders(
			<MemoryRouter>
				<UserForm user={mockedAdminUser} />
			</MemoryRouter>,
			{
				withIntl: true
			}
		)

		const password = screen.queryByTestId(DataTestKeys.userFormPassword)
		const updateBtn = screen.getByTestId(DataTestKeys.userFormUpdate)
		const saveBtn = screen.queryByTestId(DataTestKeys.userFormSave)
		const deleteBtn = screen.getByTestId(DataTestKeys.userFormDelete)

		expect(password).toBeNull()
		expect(saveBtn).toBeNull()
		expect(updateBtn).toBeInTheDocument()
		expect(deleteBtn).toBeInTheDocument()
	})

	test('should display user create page', () => {
		renderWithProviders(
			<MemoryRouter>
				<UserForm user={null} />
			</MemoryRouter>,
			{
				withIntl: true
			}
		)

		const updateBtn = screen.queryByTestId(DataTestKeys.userFormUpdate)
		const password = screen.getByTestId(DataTestKeys.userFormPassword)
		const saveBtn = screen.getByTestId(DataTestKeys.userFormSave)
		const deleteBtn = screen.queryByTestId(DataTestKeys.userFormDelete)

		expect(password).toBeInTheDocument()
		expect(saveBtn).toBeInTheDocument()
		expect(deleteBtn).toBeNull()
		expect(updateBtn).toBeNull()
	})
})
