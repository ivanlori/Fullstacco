import React from 'react'

import { configureStore } from '@reduxjs/toolkit'
import ReactDOM from 'react-dom'
import { createIntl, createIntlCache, RawIntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import enMsg from './languages/en.json'
import App from './pages/App'
import reportWebVitals from './reportWebVitals'
import rootReducer from './store'

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

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<RawIntlProvider value={intl}>
					<App />
				</RawIntlProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
