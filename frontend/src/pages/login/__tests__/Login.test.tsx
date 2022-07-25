import { AnyAction, Store } from '@reduxjs/toolkit'
import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'

import { createTestStore } from 'mocks/state'
import { renderWithIntlProvider } from 'utils/testing-library-utils'

import Login from '../Login'

let store: Store<unknown, AnyAction>

describe('Login', () => {

	beforeEach(() => {
		store = createTestStore()
	})

	test('should login and go to dasboard page', () => {
		renderWithIntlProvider(
			<Provider store={store}>
				<Login />
			</Provider>
		)

		const email = screen.getByTestId('email')
		const password = screen.getByTestId('password')

		userEvent.type(email, 'user@email.com')
		userEvent.type(password, 'somepassword')
		userEvent.click(screen.getByTestId('submitBtn'))

		waitFor(() => {
			expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
		})
	})
})