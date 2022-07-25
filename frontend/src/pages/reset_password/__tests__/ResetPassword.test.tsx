import { AnyAction, Store } from '@reduxjs/toolkit'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { createTestStore } from 'mocks/state'
import { renderWithIntlProvider } from 'utils/testing-library-utils'

import ResetPassword from '../ResetPassword'

let store: Store<unknown, AnyAction>

describe('Reset password', () => {

	beforeEach(() => {
		store = createTestStore()
	})

	test('should display success view when email submitted', () => {
		renderWithIntlProvider(
			<Provider store={store}>
				<MemoryRouter>
					<ResetPassword />
				</MemoryRouter>
			</Provider>
		)

		const email = screen.getByTestId('email')

		userEvent.type(email, 'user@email.com')
		userEvent.click(screen.getByTestId('submitBtn'))

		waitFor(() => {
			const successView = screen.getByTestId('recoverySuccess')
			expect(successView).toBeInTheDocument()
		})
	})
})