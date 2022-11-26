import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { DataTestKeys } from 'data-test-keys'
import { mockedAdminUser } from 'mocks/user'
import { renderWithProviders } from 'utils/testing-library-utils'

import { UserList } from '../UserList'

describe('UserList', () => {
	test('should go to new user page', async () => {
		renderWithProviders(
			<MemoryRouter>
				<UserList />
			</MemoryRouter>,
			{
				withIntl: true,
				preloadedState: {
					profileReducer: mockedAdminUser
				},
			},
		)
		const newBtn = screen.getByTestId(DataTestKeys.newUserBtn)
		expect(newBtn).toBeInTheDocument()
	})
})
