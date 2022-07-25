import { AnyAction, Store } from '@reduxjs/toolkit'
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { createTestStore } from 'mocks/state'
import { mockedUser } from 'mocks/user'
import { renderWithIntlProvider } from 'utils/testing-library-utils'

import UserForm from '../_components/UserForm'

let store: Store<unknown, AnyAction>

describe('UserForm', () => {

	beforeEach(() => {
		store = createTestStore()
	})

	test('should display user edit page', () => {
		renderWithIntlProvider(
			<Provider store={store}>
				<MemoryRouter>
					<UserForm user={mockedUser} />
				</MemoryRouter>
			</Provider>
		)

		const name = screen.getByTestId('name')
		const lastname = screen.getByTestId('lastname')
		const username = screen.getByTestId('username')
		const email = screen.getByTestId('email')
		const password = screen.queryByTestId('password')
		const saveBtn = screen.getByTestId('saveBtn')
		const deleteBtn = screen.getByTestId('deleteBtn')

		expect(name).toBeInTheDocument()
		expect(lastname).toBeInTheDocument()
		expect(username).toBeInTheDocument()
		expect(email).toBeInTheDocument()
		expect(password).toBeNull()
		expect(saveBtn).toBeInTheDocument()
		expect(deleteBtn).toBeInTheDocument()
	})

	test('should display user create page', () => {
		renderWithIntlProvider(
			<Provider store={store}>
				<MemoryRouter>
					<UserForm user={null} />
				</MemoryRouter>
			</Provider>
		)

		const name = screen.getByTestId('name')
		const lastname = screen.getByTestId('lastname')
		const username = screen.getByTestId('username')
		const email = screen.getByTestId('email')
		const password = screen.getByTestId('password')
		const saveBtn = screen.getByTestId('saveBtn')
		const deleteBtn = screen.queryByTestId('deleteBtn')

		expect(name).toBeInTheDocument()
		expect(lastname).toBeInTheDocument()
		expect(username).toBeInTheDocument()
		expect(email).toBeInTheDocument()
		expect(password).toBeInTheDocument()
		expect(saveBtn).toBeInTheDocument()
		expect(deleteBtn).toBeNull()
	})
})