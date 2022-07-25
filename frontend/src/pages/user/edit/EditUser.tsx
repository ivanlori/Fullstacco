import { ReactElement, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import UserForm from '../_components/UserForm'
import { getUser } from '../User.api'

const EditUser = (): ReactElement => {
	const { id } = useParams()
	const [user, setUser] = useState()

	useEffect(() => {
		(async () => {
			const result = await getUser(String(id))
			setUser(result)
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
