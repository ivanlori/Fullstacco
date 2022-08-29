import { render, RenderResult } from "@testing-library/react"
import { createIntl, RawIntlProvider } from "react-intl"

import enMsg from '../languages/en.json'

const intl = createIntl({
	locale: 'en',
	messages: enMsg
})

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
