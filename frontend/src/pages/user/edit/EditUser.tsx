import { ReactElement, useEffect, useState } from 'react'

import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Dispatch } from 'redux'

import { displayToast } from 'components/Toast/store/Toast.action'

import UserForm from '../_components/UserForm'
import { getUser } from '../User.api'

const EditUser = (): ReactElement => {
	const { id } = useParams()
	const { formatMessage } = useIntl()
	const dispatch = useDispatch<Dispatch>()
	const [user, setUser] = useState()

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
		})()
	}, [])

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<UserForm user={user} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditUser
