import { useEffect } from 'react'

import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'

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
import { getUserId, isAuthenticated } from 'utils/utils'

import { Sidebar, Header } from '../components'
import Dashboard from './dashboard/Dashboard'
import Login from './login/Login'
import Profile from './profile/Profile'
import { ProtectedRoute } from './ProtectedRoute'
import ResetPassword from './reset_password/ResetPassword'
import Signup from './signup/Signup'
import NewUser from './user/new/NewUser'
import { setUser } from './user/store/User.actions'
import { getUser } from './user/User.api'

const App = () => {
	const {
		text,
		style,
	} = useSelector((state: RootStateOrAny) => state.toast)
	const location = useLocation()
	const dispatch = useDispatch()

	useEffect(() => {

		// does user call only after auth
		if (
			location.pathname !== login &&
			location.pathname !== signup &&
			location.pathname !== recoveryPassword
		) {
			(async () => {
				const user = await getUser(getUserId())
				dispatch(setUser(user))
			})()
		}
	}, [location])

	return (
		<>
			{
				isAuthenticated() && (
					<>
						<Header />
						<Sidebar />
					</>
				)
			}
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
		</>
	)
}

export default App
