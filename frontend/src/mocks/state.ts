import { configureStore } from "@reduxjs/toolkit"

import rootReducer from '../store'

export const createTestStore = () => {
	const store = configureStore({
		reducer: rootReducer
	})
	return store
}