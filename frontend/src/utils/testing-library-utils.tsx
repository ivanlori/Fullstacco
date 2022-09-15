import { PropsWithChildren } from "react"

import { PreloadedState } from "@reduxjs/toolkit"
import { render, RenderOptions, RenderResult } from "@testing-library/react"
import { createIntl, RawIntlProvider } from "react-intl"
import { Provider } from "react-redux"

import { AppStore, RootState, setupStore } from "store"

import enMsg from '../languages/en.json'

const intl = createIntl({
	locale: 'en',
	messages: enMsg
})

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>
	store?: AppStore
	withIntl?: boolean
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		withIntl,
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
		return withIntl ? (
			<Provider store={store}>
				<RawIntlProvider value={intl}>
					{children}
				</RawIntlProvider>
			</Provider>
		) : <Provider store={store}>{children}</Provider>
	}
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const renderWithIntlProvider = (
	component: React.ReactElement,
	{ ...options } = {},
): RenderResult => {
	const wrapper = () => (
		<RawIntlProvider value={intl}>
			{component}
		</RawIntlProvider>
	)
	return render(component, { wrapper, ...options })
}
