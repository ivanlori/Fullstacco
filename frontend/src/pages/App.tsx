import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import './App.module.css'
import { Toast } from 'components'
import { displayToast } from 'components/Toast/store/Toast.action'
import {
	dashboardHome,
	dashboardProfile,
	login,
	noAccess,
	recoveryPassword,
	resetPassword,
	signup,
	dashboardUserEdit,
	dashboardUserNew,
	dashboardUserList,
} from 'routes'
import { IProfileState } from 'types/profile'
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
import { EditUser } from './user/edit/EditUser'
import { UserList } from './user/list/UserList'
import { NewUser } from './user/new/NewUser'
import { deleteUser } from './user/User.api'

export const App = () => {
	const { formatMessage } = useIntl()
	const dispatch = useDispatch()
	const navigate = useNavigate()
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

	const handleResult = (status: number | undefined, successLabel: string) => {
		if (status === 201) {
			dispatch(displayToast(
				formatMessage({ id: successLabel }),
				'success'
			))

			navigate(dashboardUserList)
		} else {
			dispatch(displayToast(
				formatMessage({ id: "feedback.general.error" }),
				'error'
			))
		}
	}

	const onDelete = async (user: IProfileState) => {
		const {
			status
		} = await deleteUser(user?._id)

		handleResult(status, "feedback.user.deleted")
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
						path={`${dashboardUserEdit}/:id`}
						element={
							<RequireAuth>
								<EditUser
									onResult={(status, message) => handleResult(status, message)}
									onDeleteUser={(user: IProfileState) => onDelete(user)} />
							</RequireAuth>
						}
					/>
					<Route
						path={dashboardUserNew}
						element={
							<RequireAuth>
								<NewUser onResult={(status, message) => handleResult(status, message)} />
							</RequireAuth>
						}
					/>
					<Route
						path={dashboardUserList}
						element={
							<RequireAuth>
								<UserList onDeleteUser={(user: IProfileState) => onDelete(user)} />
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
