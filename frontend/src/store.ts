import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

import { toastReducer } from 'components/Toast/store/Toast.reducer'
import { profileReducer } from 'pages/profile/store/Profile.reducer'

export const rootReducer = combineReducers({
	toastReducer,
	profileReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
