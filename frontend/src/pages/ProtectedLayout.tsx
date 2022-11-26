import { ReactElement } from 'react'

import { Outlet } from 'react-router-dom'

import { Header, Sidebar } from 'components'

export const ProtectedLayout = (): ReactElement => (
	<>
		<Header />
		<Sidebar />
		<Outlet />
	</>
)
