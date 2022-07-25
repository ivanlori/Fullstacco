import { AnyAction, Store } from '@reduxjs/toolkit'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { createTestStore } from 'mocks/state'
import { renderWithIntlProvider } from 'utils/testing-library-utils'

import Signup from '../Signup'

let store: Store<unknown, AnyAction>

describe('Signup', () => {
	beforeEach(() => {
		store = createTestStore()
	})

	test('should signup and go to dashboard page', () => {
		renderWithIntlProvider(
			<Provider store={store}>
				<MemoryRouter>
					<Signup />
				</MemoryRouter>
			</Provider>
		)

		const name = screen.getByTestId('name')
		const lastname = screen.getByTestId('lastname')
		const username = screen.getByTestId('username')
		const email = screen.getByTestId('email')
		const password = screen.getByTestId('password')

		userEvent.type(name, 'name')
		userEvent.type(lastname, 'lastname')
		userEvent.type(username, 'username')
		userEvent.type(email, 'user@example.com')
		userEvent.type(password, 'somepassword')
		userEvent.click(screen.getByTestId('signupBtn'))

		waitFor(() => {
			expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
		})
	})
})