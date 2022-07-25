import { render, RenderResult } from "@testing-library/react"
import { IntlProvider } from "react-intl"

export const renderWithIntlProvider = (
	component: React.ReactElement,
	{ ...options } = {},
): RenderResult => {
	const wrapper = () => (
		<IntlProvider onError={() => null} locale="en">
			{component}
		</IntlProvider>
	)
	return render(component, { wrapper, ...options })
}