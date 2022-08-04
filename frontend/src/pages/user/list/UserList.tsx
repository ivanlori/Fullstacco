import { ReactElement, useEffect, useState } from 'react'

import { FormattedMessage, useIntl } from 'react-intl'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Loader } from 'components'
import { Pen } from 'components/Icon/svg/icons'
import { displayToast } from 'components/Toast/store/Toast.action'
import { editUser, fullPathNewUser } from 'routes'
import { isAdmin } from 'utils/utils'

import { IUserState } from '../store/User.models'
import { getUsers } from '../User.api'
import styles from './UserList.module.css'

const UserList = (): ReactElement => {
	const userState = useSelector((state: RootStateOrAny) => state.user)
	const dispatch = useDispatch<Dispatch>()
	const { formatMessage } = useIntl()
	const [loading, setLoading] = useState(true)

	const navigate = useNavigate()
	const [users, setUsers] = useState<IUserState[]>([{
		updatedAt: new Date().toISOString(),
		createdAt: new Date().toISOString(),
		email: '',
		id: '',
		lastname: '',
		name: '',
		username: '',
		password: '',
		role: 0,
		isActive: false,
		emailConfirmed: false
	}])

	useEffect(() => {
		(async () => {
			const {
				data,
				status
			} = await getUsers()

			if (status === 200) {
				setUsers(data)
				setLoading(false)
			} else {
				dispatch(displayToast(
					formatMessage({ id: "feedback.general.error" }), 'error')
				)
			}
		})()
	}, [])

	const createUserPage = () => navigate(fullPathNewUser)

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
				{users.map((user: IUserState) => (
					<tr
						className="border-b"
						key={user.id}
					>
						<td className={styles.CellBody}>
							{user.name}
						</td>
						<td className={styles.CellBody}>
							{user.lastname}
						</td>
						<td className={styles.CellBody}>
							{user.email}
						</td>
						<td className={`${styles.CellBody} ${styles.Status}`}>
							<span
								className={user.isActive ? 'bg-green_light' : 'bg-ochre_dark'}
							></span>
						</td>
						<td className={styles.CellBody}>
							<span>{user.createdAt}</span>
						</td>
						<td className={`${styles.CellBody} ${styles.Edit}`}>
							<Pen
								width={15}
								height={15}
								onClick={() => {
									navigate(`/users/${user.id}/${editUser}`)
								}}
								data-testid="editIcon"
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
							{isAdmin(userState) && (
								<Button
									style="primary"
									onClick={createUserPage}
									dataTestId="newUserBtn"
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
