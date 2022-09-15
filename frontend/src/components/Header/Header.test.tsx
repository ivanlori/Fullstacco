import { configureStore } from '@reduxjs/toolkit'
import { screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { DataTestKeys } from 'data-test-keys'
import rootReducer from 'store'
import { renderWithIntlProvider } from 'utils/testing-library-utils'

import Header from './Header'

const store = configureStore({
	reducer: rootReducer,
})

describe('<Header />', () => {
	test('should display username on top right', () => {

		renderWithIntlProvider(
			<Provider store={store}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		)

		expect(
			screen.getByTestId(DataTestKeys.headerUsername)
		).toBeInTheDocument()
	})

	test('should display the dropdown with profile and logout menu', () => {

		renderWithIntlProvider(
			<Provider store={store}>
				<MemoryRouter>
					<Header />
				</MemoryRouter>
			</Provider>
		)

		const dropdownMenu = screen.getByTestId(DataTestKeys.dropdownMenu)

		fireEvent.click(dropdownMenu)

		expect(
			screen.getByTestId(DataTestKeys.userDropdown)
		).toBeInTheDocument()
		expect(
			screen.getByTestId(DataTestKeys.profileDropdown)
		).toBeInTheDocument()
		expect(
			screen.getByTestId(DataTestKeys.logoutDropdown)
		).toBeInTheDocument()
	})
})
