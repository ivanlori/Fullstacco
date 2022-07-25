import { ReactElement } from 'react'

import { RootStateOrAny, useSelector } from 'react-redux'

const Profile = (): ReactElement => {
	const user = useSelector((state: RootStateOrAny) => state.user)

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex" >
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<ul>
							<li>Name: {user.name}</li>
							<li>Username: {user.username}</li>
							<li>Lastname: {user.lastname}</li>
							<li>active: {user.isActive ? 'Yes' : 'No'}</li>
							<li>Email: {user.email}</li>
							<li>Role: {user.role === 0 ? 'Admin' : 'Account'}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
