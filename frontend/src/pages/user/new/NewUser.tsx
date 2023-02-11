import { ReactElement } from 'react'

import { useIntl } from 'react-intl'

import { Back } from 'components/Back/Back'

import { UserForm } from '../_components/UserForm'

interface Props {
	onResult: (status: string, message: string) => void
}

export const NewUser = ({
	onResult
}: Props): ReactElement => {
	const { formatMessage } = useIntl()

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<Back />
						<UserForm
							onDelete={() => null}
							onResult={(status, message) => {
								onResult(status, message)
							}}
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
