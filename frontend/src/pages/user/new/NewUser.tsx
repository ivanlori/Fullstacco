import { ReactElement } from 'react'

import { useIntl } from 'react-intl'

import { UserForm } from '../_components/UserForm'

export const NewUser = (): ReactElement => {
	const { formatMessage } = useIntl()

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<UserForm
							user={null}
							title={formatMessage({
								id: 'user.create.update.title.create'
							})} />
					</div>
				</div>
			</div>
		</div>
	)
}
