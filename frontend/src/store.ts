import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

import toast from 'components/Toast/store/Toast.reducer'
import profile from 'pages/profile/store/Profile.reducer'

const rootReducer = combineReducers({
	toast,
	profile
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

export default rootReducer
