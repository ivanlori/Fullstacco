import { ReactElement } from 'react'

import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'

import { IState } from 'types/state'
import { getRoleLabelId } from 'utils/utils'

import { Photo } from './_components/photo/Photo'

export const Profile = (): ReactElement => {
	const {
		email,
		lastname,
		name,
		photoUrl,
		username,
		role,
		_id
	} = useSelector((state: IState) => state.profileReducer)

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<div className="flex gap-4">
							<div className="w-1/5">
								<Photo
									id={_id as string}
									photoUrl={photoUrl}
								/>
							</div>
							<div className="w-4/5">
								<h2><FormattedMessage id="profile.title" /></h2>
								<ul>
									<li>
										<FormattedMessage id="name" />: {name}
									</li>
									<li>
										<FormattedMessage id="lastname" />: {lastname}
									</li>
									<li>
										<FormattedMessage id="email" />: {email}
									</li>
									<li>
										<FormattedMessage id="username" />: {username}
									</li>
									<li>
										<FormattedMessage id="role" />: <FormattedMessage id={getRoleLabelId(Number(role))} />
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
