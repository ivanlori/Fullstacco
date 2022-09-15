import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { renderWithProviders } from 'utils/testing-library-utils'

import EditUser from '../edit/EditUser'

describe('EditUser', () => {

	test('should match snapshot', () => {
		const { container } = renderWithProviders(
			<MemoryRouter>
				<EditUser />
			</MemoryRouter>,
			{ withIntl: true }
		)

		expect(container).toMatchSnapshot()
	})
})
