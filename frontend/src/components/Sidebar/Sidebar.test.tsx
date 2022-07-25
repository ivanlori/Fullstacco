import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { renderWithIntlProvider } from 'utils/testing-library-utils'

import Sidebar from './Sidebar'

describe('<SidebarNav />', () => {
	test('should display links', () => {

		renderWithIntlProvider(
			<MemoryRouter>
				<Sidebar />
			</MemoryRouter>
		)

		const linkUsers = screen.getByTestId('link-users')
		const linkHome = screen.getByTestId('link-home')

		expect(linkUsers).toBeInTheDocument()
		expect(linkHome).toBeInTheDocument()
	})
})
