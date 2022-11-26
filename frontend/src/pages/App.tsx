import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import './App.module.css'
import { Toast } from 'components'
import { EditUser } from 'pages/user/edit/EditUser'
import { UserList } from 'pages/user/list/UserList'
import {
	dashboardEditUser,
	dashboardHome,
	dashboardNewUser,
	dashboardProfile,
	dashboardUsers,
	login,
	noAccess,
	recoveryPassword,
	resetPassword,
	signup,
} from 'routes'
import { IState } from 'types/state'

import { Login } from './auth/login/Login'
import { RequireAuth } from './auth/RequireAuth'
import { ResetPassword } from './auth/reset_password/ResetPassword'
import { Signup } from './auth/signup/Signup'
import { Dashboard } from './dashboard/Dashboard'
import { NoAccess } from './no_access/NoAccess'
import { NotFound } from './not_found/NotFound'
import { Profile } from './profile/Profile'
import { ProtectedLayout } from './ProtectedLayout'
import { PublicLayout } from './PublicLayout'
import { NewUser } from './user/new/NewUser'

export const App = () => {
	const {
		text,
		style,
	} = useSelector((state: IState) => state.toastReducer)
	const {
		isActive
	} = useSelector((state: IState) => state.profileReducer)

	if (!isActive) {
		<Navigate to={noAccess} />
	}

	return (
		<main>
			{text && <Toast text={text} type={style} />}
			<Routes>
				<Route element={<ProtectedLayout />}>
					<Route
						path={dashboardHome}
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route
						path={dashboardEditUser}
						element={
							<RequireAuth>
								<EditUser />
							</RequireAuth>
						}
					/>
					<Route
						path={dashboardProfile}
						element={
							<RequireAuth>
								<Profile />
							</RequireAuth>
						}
					/>
					<Route
						path={dashboardNewUser}
						element={
							<RequireAuth>
								<NewUser />
							</RequireAuth>
						}
					/>
					<Route
						path={dashboardUsers}
						element={
							<RequireAuth>
								<UserList />
							</RequireAuth>
						}
					/>
					<Route
						path="*"
						element={
							<RequireAuth>
								<NotFound />
							</RequireAuth>
						}
					/>
				</Route>
				<Route element={<PublicLayout />}>
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
						path={`${resetPassword}/:token`}
						element={<ResetPassword />}
					/>
					<Route
						path={noAccess}
						element={<NoAccess />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Route>
			</Routes>
		</main>
	)
}
