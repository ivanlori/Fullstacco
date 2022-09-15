import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import {
	renderWithProviders
} from 'utils/testing-library-utils'

import Signup from '../Signup'

describe('Signup', () => {

	test('should signup and go to dashboard page', () => {
		renderWithProviders(
			<MemoryRouter>
				<Signup />
			</MemoryRouter>,
			{
				withIntl: true
			}
		)

		const name = screen.getByTestId(DataTestKeys.signupName)
		const lastname = screen.getByTestId(DataTestKeys.signupLastname)
		const username = screen.getByTestId(DataTestKeys.signupUsername)
		const email = screen.getByTestId(DataTestKeys.signupEmail)
		const password = screen.getByTestId(DataTestKeys.signupPassword)

		userEvent.type(name, 'name')
		userEvent.type(lastname, 'lastname')
		userEvent.type(username, 'username')
		userEvent.type(email, 'user@example.com')
		userEvent.type(password, 'somepassword')
		userEvent.click(screen.getByTestId(DataTestKeys.signupBtn))

		waitFor(() => {
			expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
		})
	})
})
