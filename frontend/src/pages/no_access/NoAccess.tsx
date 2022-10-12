import { FormattedMessage } from "react-intl"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { resetProfile } from "pages/profile/store/Profile.actions"
import { login } from "routes"
import { TOKEN_STORAGE, USER_ID_STORAGE } from "utils/utils"

const NoAccess = () => {
	const dispatch = useDispatch()

	return (
		<div className="lg:pl-24">
			<div className="xl:mx-auto flex">
				<div className="flex flex-col w-full">
					<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
						<div className="text-center flex flex-col justify-center">
							<h1 className="text-2xl">
								<FormattedMessage id="account.disabled.title" />
							</h1>
							<p className="mt-4">
								<FormattedMessage
									id="account.disabled.description"
								/>
							</p>
							<Link
								to={login}
								onClick={() => {
									localStorage.removeItem(TOKEN_STORAGE)
									localStorage.removeItem(USER_ID_STORAGE)
									dispatch(resetProfile())
								}}
							>
								<FormattedMessage id='logout' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NoAccess
