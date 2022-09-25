import { ReactElement, useEffect, useState } from 'react'

import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Loader } from 'components'
import { Pen } from 'components/Icon/svg/icons'
import { displayToast } from 'components/Toast/store/Toast.action'
import { DataTestKeys } from 'data-test-keys'
import { editUser, fullPathNewUser } from 'routes'
import { IUserState } from 'types/profile'
import { IState } from 'types/state'
import { isAdmin } from 'utils/utils'

import { getUsers } from '../User.api'
import styles from './UserList.module.css'

const UserList = (): ReactElement => {
	const profileState = useSelector((state: IState) => state.profile)
	const dispatch = useDispatch<Dispatch>()
	const { formatMessage } = useIntl()
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const [users, setUsers] = useState<IUserState[]>([])

	useEffect(() => {
		if (users.length === 0) {
			(async () => {
				const {
					data,
					status
				} = await getUsers()

				if (status === 200) {
					setUsers(data)
				} else {
					dispatch(displayToast(
						formatMessage({ id: "feedback.general.error" }), 'error')
					)
				}
				setLoading(false)
			})()
		}
	}, [dispatch, formatMessage, users])

	const createUserPage = () => navigate(fullPathNewUser)

	const statusStyle = (user: IUserState) => {
		return classNames({
			['bg-green_light']: user.isActive,
			['bg-ochre_dark']: !user.isActive
		})
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
								className={`${styles.CellBody} ${styles.Status}`}
								data-testid={DataTestKeys.rowUserStatus}
							>
								<span
									className={statusStyle(user)}
								></span>
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
										navigate(`/users/${user.id}/${editUser}`)
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
								<Button
									style="primary"
									onClick={createUserPage}
									dataTestId={DataTestKeys.newUserBtn}
								>
									<FormattedMessage id="userlist.new.user" />
								</Button>
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
