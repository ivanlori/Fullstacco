import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { mockedAdminUser } from 'mocks/user'
import {
	renderWithProviders
} from 'utils/testing-library-utils'

import Profile from './Profile'

describe('<Profile />', () => {

	test('should match snapshot', () => {

		const { container } = renderWithProviders(
			<MemoryRouter>
				<Profile />
			</MemoryRouter>,
			{
				preloadedState: {
					profile: mockedAdminUser
				},
				withIntl: true
			}
		)

		expect(container).toMatchSnapshot()
	})
})
