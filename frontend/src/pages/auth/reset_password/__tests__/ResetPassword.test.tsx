import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import {
	renderWithProviders
} from 'utils/testing-library-utils'

import { ResetPassword } from '../ResetPassword'

describe('Reset password', () => {

	test('should display success view when email submitted', () => {
		renderWithProviders(
			<MemoryRouter>
				<ResetPassword />
			</MemoryRouter>,
			{
				withIntl: true
			}
		)

		const email = screen.getByTestId(DataTestKeys.resetPasswordEmail)

		userEvent.type(email, 'user@email.com')
		userEvent.click(screen.getByTestId(DataTestKeys.resetPasswordSubmit))

		waitFor(() => {
			const successView = screen.getByTestId(DataTestKeys.recoverySuccess)
			expect(successView).toBeInTheDocument()
		})
	})
})
