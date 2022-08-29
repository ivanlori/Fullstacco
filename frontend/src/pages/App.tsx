import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import './App.module.css'
import { Toast } from 'components'
import EditUser from 'pages/user/edit/EditUser'
import User from 'pages/user/list/UserList'
import {
	fullPathEditUser,
	fullPathNewUser,
	login,
	profile,
	recoveryPassword,
	signup
} from 'routes'
import { IState } from 'types/state'

import Dashboard from './dashboard/Dashboard'
import Login from './login/Login'
import Profile from './profile/Profile'
import { ProtectedRoute } from './ProtectedRoute'
import ResetPassword from './reset_password/ResetPassword'
import Signup from './signup/Signup'
import NewUser from './user/new/NewUser'

const App = () => {
	const {
		text,
		style,
	} = useSelector((state: IState) => state.toast)

	return (
		<main>
			{text && <Toast text={text} type={style} />}
			<Routes>
				<Route
					path={login}
					element={<Login />}
				/>
				<Route
					path={signup}
					element={<Signup />}
				/>
				<Route
					path={recoveryPassword}
					element={<ResetPassword />}
				/>
				<Route
					path="/reset-password/:token"
					element={<ResetPassword />}
				/>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path={fullPathEditUser}
					element={
						<ProtectedRoute>
							<EditUser />
						</ProtectedRoute>
					}
				/>
				<Route
					path={profile}
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path={fullPathNewUser}
					element={
						<ProtectedRoute>
							<NewUser />
						</ProtectedRoute>
					}
				/>
				<Route
					path="users"
					element={
						<ProtectedRoute>
							<User />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</main>
	)
}

export default App
