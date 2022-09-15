import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { renderWithProviders } from 'utils/testing-library-utils'

import NewUser from '../new/NewUser'

describe('NewUser', () => {

	test('should match snapshot', () => {
		const { container } = renderWithProviders(
			<MemoryRouter>
				<NewUser />
			</MemoryRouter>,
			{
				withIntl: true
			}
		)

		expect(container).toMatchSnapshot()
	})
})
