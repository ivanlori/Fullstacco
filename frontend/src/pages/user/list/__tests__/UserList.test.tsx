import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { DataTestKeys } from 'data-test-keys'
import { renderWithProviders } from 'utils/testing-library-utils'

import UserList from '../UserList'

describe('UserList', () => {

	test('should click on new and go to new user page', async () => {
		renderWithProviders(
			<MemoryRouter>
				<UserList />
			</MemoryRouter>,
			{
				withIntl: true,
			},
		)

		const newBtn = screen.getByTestId(DataTestKeys.newUserBtn)

		expect(newBtn).toBeInTheDocument()
	})
})
