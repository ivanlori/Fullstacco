import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import { mockedAdminUser } from 'mocks/user'
import {
	renderWithProviders
} from 'utils/testing-library-utils'

import Profile from './Profile'

describe('<Profile />', () => {

	test('should display data of the profile', () => {

		renderWithProviders(
			<MemoryRouter>
				<Profile />
			</MemoryRouter>,
			{
				preloadedState: {
					user: mockedAdminUser
				},
				withIntl: true
			}
		)

		expect(
			screen.getByTestId(DataTestKeys.profileNameLastname)
		).toHaveTextContent(`${mockedAdminUser.name} ${mockedAdminUser.lastname}`)
		expect(
			screen.getByTestId(DataTestKeys.profileUsername)
		).toHaveTextContent(mockedAdminUser.username)
		expect(
			screen.getByTestId(DataTestKeys.profileEmail)
		).toHaveTextContent(mockedAdminUser.email)
	})
})
