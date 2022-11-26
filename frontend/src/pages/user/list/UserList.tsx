import {
	ReactElement,
} from 'react'

import "gridjs/dist/theme/mermaid.css"
import { Grid, _ } from 'gridjs-react'
import moment from 'moment'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from 'components'
import { Pen } from 'components/Icon/svg/icons'
import { displayToast } from 'components/Toast/store/Toast.action'
import { Toggle } from 'components/Toggle/Toggle'
import { BASE_API } from 'config'
import { DataTestKeys } from 'data-test-keys'
import { dashboardNewUser, dashboardUsers } from 'routes'
import { IProfileState } from 'types/profile'
import { IState } from 'types/state'
import { getToken, isAdmin } from 'utils/utils'

import { changeUserStatus } from '../User.api'
import styles from './UserList.module.css'

export const UserList = (): ReactElement => {
	const dispatch = useDispatch()
	const profileState = useSelector((state: IState) => state.profileReducer)
	const { formatMessage } = useIntl()
	const navigate = useNavigate()
	const createUserPage = () => navigate(dashboardNewUser)

	const onChangeStatus = async (user: IProfileState) => {
		const {
			status
		} = await changeUserStatus(user._id as string, !user.isActive)

		if (status === 201) {
			// refresh list with updated status
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
							<Grid
								className={
									{ table: 'min-w-full' }
								}
								columns={[
									{
										id: 1,
										name: formatMessage({ id: "userlist.name" })
									},
									{
										id: 2,
										name: formatMessage({ id: "userlist.lastname" })
									},
									{
										id: 3,
										name: formatMessage({ id: "userlist.email" })
									},
									{
										id: 4,
										name: formatMessage({ id: "userlist.status" })
									},
									{
										id: 5,
										name: formatMessage({ id: "userlist.created.at" })
									},
									{
										id: 6,
										name: ''
									}
								]}
								search={true}
								pagination={{
									enabled: true,
									limit: 15,
									page: 1,
									server: {
										url: (prev, page, limit) => `${prev}?limit=${limit}&page=${page + 1}`
									}
								}}
								server={{
									url: `${BASE_API}/users/`,
									method: 'GET',
									headers: {
										'Authorization': `Bearer ${getToken()}`
									},
									then: data => data.users
										.filter((user: IProfileState) => user._id !== profileState._id)
										.map((user: IProfileState) => {
											const formattedDate = moment(user.createdAt).format('lll')
											return [
												user.name,
												user.lastname,
												user.email,
												_(
													<Toggle
														id={user._id as string}
														active={user.isActive}
														onChange={() => onChangeStatus(user)}
													/>
												),
												formattedDate,
												_(
													<Pen
														width={20}
														height={20}
														onClick={() => {
															navigate(`${dashboardUsers}/${user._id}/edit`)
														}}
														data-testid={DataTestKeys.editIcon}
													/>
												)
											]
										}),
									total: data => data.users.length
								}}
							/>
						}
					</div>
				</div>
			</div>
		</div>
	)
}
