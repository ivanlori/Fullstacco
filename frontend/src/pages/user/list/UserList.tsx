import { ReactElement, useCallback, useEffect, useState } from 'react'

import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Loader } from 'components'
import { Pen } from 'components/Icon/svg/icons'
import { displayToast } from 'components/Toast/store/Toast.action'
import { DataTestKeys } from 'data-test-keys'
import { dashboardNewUser, dashboardUsers } from 'routes'
import { IUserState } from 'types/profile'
import { IState } from 'types/state'
import { isAdmin } from 'utils/utils'

import { changeUserStatus, fetchUsers } from '../User.api'
import styles from './UserList.module.css'

const UserList = (): ReactElement => {
	const profileState = useSelector((state: IState) => state.profile)
	const dispatch = useDispatch<Dispatch>()
	const { formatMessage } = useIntl()
	const [statusLoading, setStatusLoading] = useState(false)
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [users, setUsers] = useState<IUserState[]>([])

	const getUsers = useCallback(async () => {
		const {
			data,
			status
		} = await fetchUsers()

		if (status === 200) {
			setUsers(data)
		} else {
			dispatch(displayToast(
				formatMessage({
					id: "feedback.general.error"
				}), 'error')
			)
		}
		setLoading(false)
	}, [dispatch, formatMessage])

	useEffect(() => {
		if (users.length === 0) {
			getUsers()
		}
	}, [dispatch, formatMessage, getUsers, users])

	const createUserPage = () => navigate(dashboardNewUser)

	const statusBackgroundStyle = (user: IUserState) => {
		return classNames(styles.BackgroundStatus, {
			['bg-green_light']: user.isActive,
			['bg-ochre_dark']: !user.isActive
		})
	}

	const statusDotStyle = (user: IUserState) => {
		return classNames(styles.DotStatus, {
			['right-1']: user.isActive,
			['left-1']: !user.isActive
		})
	}

	const onChangeStatus = async (user: IUserState) => {
		setStatusLoading(true)

		const {
			status
		} = await changeUserStatus(user.id as string, !user.isActive)

		if (status === 201) {
			// refresh list with updated status
			getUsers()
			dispatch(displayToast(
				formatMessage({
					id: "feedback.general.status.success"
				}), 'success')
			)
		} else {
			dispatch(displayToast(
				formatMessage({ id: "feedback.general.error" }), 'error')
			)
		}

		setStatusLoading(false)
	}

	const renderTable = () => (
		<table className="min-w-full">
			<thead className="border-b">
				<tr>
					<th className={styles.CellHead}>
						<FormattedMessage id="userlist.name" />
					</th>
					<th className={styles.CellHead}>
						<FormattedMessage id="userlist.lastname" />
					</th>
					<th className={styles.CellHead}>
						<FormattedMessage id="userlist.email" />
					</th>
					<th className={styles.CellHead}>
						<FormattedMessage id="userlist.status" />
					</th>
					<th className={styles.CellHead}>
						<FormattedMessage id="userlist.created.at" />
					</th>
				</tr>
			</thead>
			<tbody>
				{users
					.filter((user) => user.id !== profileState.id)
					.map((user: IUserState) => (
						<tr
							className="border-b"
							key={user.id}
							data-testid={DataTestKeys.rowUser}
						>
							<td
								className={styles.CellBody}
								data-testid={DataTestKeys.rowUserName}
							>
								{user.name}
							</td>
							<td
								className={styles.CellBody}
								data-testid={DataTestKeys.rowUserLastname}
							>
								{user.lastname}
							</td>
							<td
								className={styles.CellBody}
								data-testid={DataTestKeys.rowUserEmail}
							>
								{user.email}
							</td>
							<td
								data-testid={DataTestKeys.rowUserStatus}
							>
								{statusLoading ?
									<Loader small />
									: (
										<label
											htmlFor={user.id}
											className={styles.StatusLabel}
										>
											<div className="relative">
												<input
													type="checkbox"
													id={user.id}
													className="sr-only"
												/>
												<div
													role="button"
													tabIndex={-1}
													className={statusBackgroundStyle(user)}
													onKeyDown={() => onChangeStatus(user)}
													onClick={() => onChangeStatus(user)}
												></div>
												<div
													role="button"
													tabIndex={-1}
													className={statusDotStyle(user)}
													onKeyDown={() => onChangeStatus(user)}
													onClick={() => onChangeStatus(user)}
												></div>
											</div>
										</label>
									)}
							</td>
							<td
								className={styles.CellBody}
								data-testid={DataTestKeys.rowUserCreatedAt}
							>
								<span>{user.createdAt}</span>
							</td>
							<td className={`${styles.CellBody} ${styles.Edit}`}>
								<Pen
									width={15}
									height={15}
									onClick={() => {
										navigate(`${dashboardUsers}/${user.id}/edit`)
									}}
									data-testid={DataTestKeys.editIcon}
								/>
							</td>
						</tr>
					))}
			</tbody>
		</table>
	)

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className={styles.Container}>
						<div className={styles.HeaderWrapper}>
							<h5 className="text-2xl">
								<FormattedMessage id="userlist.title" />
							</h5>
							{isAdmin(profileState) && (
								<div className="w-40">
									<Button
										style="primary"
										onClick={createUserPage}
										dataTestId={DataTestKeys.newUserBtn}
									>
										<FormattedMessage id="userlist.new.user" />
									</Button>
								</div>
							)}
						</div>
						{
							loading ? <Loader small /> : renderTable()
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserList
