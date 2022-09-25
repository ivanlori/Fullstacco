import { ReactNode, useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { Dispatch } from "redux"

import { Header, Loader, Sidebar } from "components"
import { getUserId } from "utils/utils"

import { setProfile } from "./profile/store/Profile.actions"
import { getUser } from "./user/User.api"

interface Props {
	children: ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
	const dispatch = useDispatch<Dispatch>()
	const [loading, setLoading] = useState(true)
	const [showLogin, setShowLogin] = useState(false)

	useEffect(() => {
		(async () => {
			const {
				data,
				status
			} = await getUser(getUserId())

			if (status === 200) {
				dispatch(setProfile(data))
			} else {
				setShowLogin(true)
			}

			setLoading(false)
		})()
	}, [dispatch])

	if (showLogin) return <Navigate to="/login" />

	return (
		<>
			<Header />
			<Sidebar />
			{loading ? <Loader /> : children}
		</>
	)
}

export default ProtectedRoute
