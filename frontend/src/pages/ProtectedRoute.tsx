import { ReactElement, useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"

import { Header, Loader, Sidebar } from "components"
import { getUserId } from "utils/utils"

import { setUser } from "./user/store/User.actions"
import { getUser } from "./user/User.api"

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [showLogin, setShowLogin] = useState(false)

	useEffect(() => {
		(async () => {
			setLoading(true)

			const {
				data,
				status
			} = await getUser(getUserId())

			if (status === 200) {
				dispatch(setUser(data))
			} else {
				setShowLogin(true)
			}

			setLoading(false)
		})()
	}, [])

	if (showLogin) return <Navigate to="/login" />

	return loading ? <Loader /> : (
		<>
			<Header />
			<Sidebar />
			{children}
		</>
	)
}
