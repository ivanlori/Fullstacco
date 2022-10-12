import { FormattedMessage } from "react-intl"
import { Link } from "react-router-dom"

import { dashboardHome } from "routes"

const NoAccess = () => (
	<div className="lg:pl-24">
		<div className="xl:mx-auto flex">
			<div className="flex flex-col w-full">
				<div className="bg-white text-gray_900 rounded-xl p-5 m-10">
					<div className="text-center flex flex-col justify-center">
						<h1 className="text-2xl">
							<FormattedMessage id="page.not.found" />
						</h1>
						<Link
							to={dashboardHome}
							replace
						>
							<FormattedMessage id='page.not.found.go.to.home' />
						</Link>
					</div>
				</div>
			</div>
		</div>
	</div>
)

export default NoAccess
