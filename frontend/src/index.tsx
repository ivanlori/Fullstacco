import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { login } from 'routes'
import { TOKEN_STORAGE, USER_ID_STORAGE } from 'utils/utils'

import './index.css'
import enMsg from './languages/en.json'
import { App } from './pages/App'
import reportWebVitals from './reportWebVitals'
import { rootReducer } from './store'

const store = configureStore({
	reducer: rootReducer,
})

/*
* From the documentation:
* This is optional but highly recommended
* since it prevents memory leak
*/
const cache = createIntlCache()

const intl = createIntl({
	locale: 'en',
	messages: enMsg,
}, cache)

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

axios.interceptors.response.use(function (response) {
	return response
}, function (error) {
	if (error.response.status === 401) {
		localStorage.removeItem(TOKEN_STORAGE)
		localStorage.removeItem(USER_ID_STORAGE)
		window.location.href = login
	} else {
		return Promise.reject(error)
	}
})

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<RawIntlProvider value={intl}>
				<App />
			</RawIntlProvider>
		</BrowserRouter>
	</Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
