import { ReactElement } from 'react'

import { Outlet } from 'react-router-dom'

export const PublicLayout = (): ReactElement => (
	<section className="text-gray_800 flex justify-center items-center h-screen">
		<Outlet />
	</section>
)
