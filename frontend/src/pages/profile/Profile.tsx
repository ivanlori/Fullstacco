import { ReactElement } from 'react'

import classNames from 'classnames'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

import { IState } from 'types/state'

import styles from './Profile.module.css'

const Profile = (): ReactElement => {
	const user = useSelector((state: IState) => state.user)
	const { formatMessage } = useIntl()

	const activeStyle = classNames('rounded-full w-4 h-4 mr-2', {
		"bg-green_primary": user.isActive,
		"bg-magenta_dark": !user.isActive
	})

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex" >
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<div className="flex">
							<div className={styles.Img}></div>
							<div className="ml-4 flex flex-col">
								<span className="flex items-center text-xl">
									<span className={activeStyle}>
										{user.isActive}
									</span>
									<span>{user.username}</span>
								</span>
								<span>
									<span className="text-gray_500">
										{formatMessage({ id: "fullname" })}:
									</span>
									{' '}
									<span>{user.name} {user.lastname}</span>
								</span>
								<span>
									<span className="text-gray_500">
										{formatMessage({ id: "email" })}:
									</span>
									{' '}
									<span>{user.email}</span>
								</span>
								<span>
									<span className="text-gray_500">
										{formatMessage({ id: 'role' })}: {' '}
									</span>
									<span>
										{user.role === 0 ? 'Admin' : 'Account'}
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile
