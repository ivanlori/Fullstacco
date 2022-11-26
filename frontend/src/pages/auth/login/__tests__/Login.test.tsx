import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import {
	renderWithProviders
} from 'utils/testing-library-utils'

import { Login } from '../Login'

describe('Login', () => {

	test('should login and go to dasboard page', () => {
		renderWithProviders(
			<MemoryRouter>
				<Login />
			</MemoryRouter>,
			{
				withIntl: true
			}
		)

		const email = screen.getByTestId(DataTestKeys.loginEmail)
		const password = screen.getByTestId(DataTestKeys.loginPassword)

		userEvent.type(email, 'user@email.com')
		userEvent.type(password, 'somepassword')
		userEvent.click(screen.getByTestId(DataTestKeys.loginSubmit))

		waitFor(() => {
			expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
		})
	})
})
