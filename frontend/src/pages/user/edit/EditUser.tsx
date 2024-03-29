import { ReactElement, useEffect, useState } from 'react'

import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux'

import { Loader } from 'components'
import { Back } from 'components/Back/Back'
import { displayToast } from 'components/Toast/store/Toast.action'
import { IProfileState } from 'types/profile'

import { UserForm } from '../_components/UserForm'
import { getUser } from '../User.api'

interface Props {
	onDeleteUser: (user: IProfileState) => void
	onResult: (status: string, message: string) => void
}

export const EditUser = ({
	onDeleteUser,
	onResult
}: Props): ReactElement => {
	const { id } = useParams()
	const { formatMessage } = useIntl()
	const [loading, setLoading] = useState(true)
	const dispatch = useDispatch<Dispatch>()
	const [user, setUser] = useState(null)

	useEffect(() => {
		(async () => {
			const {
				data,
				status
			} = await getUser(String(id))

			if (status === 200) {
				setUser(data)
			} else {
				dispatch(displayToast(
					formatMessage({ id: "feedback.general.error" }), 'error')
				)
			}
			setLoading(false)
		})()
	}, [dispatch, formatMessage, id])

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<>
							<Back />
							{loading ? <Loader />
								: (
									<UserForm
										onResult={(status, message) => {
											onResult(status, message)
										}}
										onDelete={(user: IProfileState) => onDeleteUser(user)}
										user={user}
										title={formatMessage({
											id: 'user.create.update.title.update'
										})}
									/>
								)}
						</>
					</div>
				</div>
			</div>
		</div>
	)
}
