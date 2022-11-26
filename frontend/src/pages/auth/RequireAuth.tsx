import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Dispatch } from "redux"

import { Loader } from "components"
import { login } from "routes"
import { getUserId } from "utils/utils"

import { setProfile } from "../profile/store/Profile.actions"
import { getUser } from "../user/User.api"

interface Props {
	children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {
	const dispatch = useDispatch<Dispatch>()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const {
				data,
				status
			} = await getUser(getUserId())

			if (status === 200) {
				dispatch(setProfile(data))
				setLoading(false)
			} else {
				navigate(login)
			}
		})()
	}, [dispatch, navigate])

	return loading ? <Loader /> : children
}
