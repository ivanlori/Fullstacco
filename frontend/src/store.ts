import { combineReducers } from 'redux'

import toast from './components/Toast/store/Toast.reducer'
import user from './pages/user/store/User.reducer'

const rootReducer = combineReducers({
	user,
	toast
})

export default rootReducer
