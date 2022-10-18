import {
	ChangeEvent,
	ReactElement,
	useCallback,
	useEffect,
	useState
} from 'react'

import classNames from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Button, Input, Loader, Pagination } from 'components'
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
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [users, setUsers] = useState<IUserState[]>([])
	const [searchedValue, setSearchedValue] = useState('')
	const [totalPages, setTotalPages] = useState(1)

	const getUsers = useCallback(async (page: number) => {
		setLoading(true)
		const {
			data,
			status
		} = await fetchUsers(page)

		if (status === 200) {
			setUsers(data.users)
			setTotalPages(data.totalPages)
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
			getUsers(1)
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
		} = await changeUserStatus(user._id as string, !user.isActive)

		if (status === 201) {
			// refresh list with updated status
			getUsers(1)
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

	const formatDateYMD = (date: Date) => {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
	}

	const filterByName = (user: IUserState) => {
		return searchedValue ? user.name.startsWith(searchedValue) : user
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
					<th className={styles.CellHead}></th>
				</tr>
			</thead>
			<tbody>
				{users
					.filter((user) => user._id !== profileState._id)
					.filter((user) => filterByName(user))
					.map((user: IUserState) => {
						const creationDate = new Date(user.createdAt as string)
						const formattedDate = formatDateYMD(creationDate)
						return (
							<tr
								className="border-b"
								key={user._id}
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
												htmlFor={user._id}
												className={styles.StatusLabel}
											>
												<div className="relative">
													<input
														type="checkbox"
														id={user._id}
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
									<span>
										{formattedDate}
									</span>
								</td>
								<td className={`${styles.CellBody} ${styles.Edit}`}>
									<Pen
										width={20}
										height={20}
										onClick={() => {
											navigate(`${dashboardUsers}/${user._id}/edit`)
										}}
										data-testid={DataTestKeys.editIcon}
									/>
								</td>
							</tr>
						)
					})}
			</tbody>
		</table>
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchedValue(e.target.value)
	}

	return (
		<div className="lg:pl-24 sm:mb-36">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className={styles.Container}>
						<div className={styles.HeaderWrapper}>
							<h5 className="text-2xl">
								<FormattedMessage id="userlist.title" />
							</h5>
							<div className="flex items-end">
								<div className="mx-5">
									<label htmlFor="search">
										<FormattedMessage id="search.placeholder" />
									</label>
									<Input
										id="search"
										onChange={handleSearch}
										placeholder={
											formatMessage({ id: 'search.placeholder' })
										}
									/>
								</div>
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
						</div>
						{
							loading ? <Loader small /> : renderTable()
						}
					</div>
					<Pagination
						totalPages={totalPages}
						getData={getUsers}
					/>
				</div>
			</div>
		</div>
	)
}

export default UserList
