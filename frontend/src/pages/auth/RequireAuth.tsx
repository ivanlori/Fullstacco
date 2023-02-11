import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { Dispatch } from "redux"

import { Loader } from "components"
import { getUserId } from "utils/utils"

import { setProfile } from "../profile/store/Profile.actions"
import { getUser } from "../user/User.api"

interface Props {
	children: JSX.Element
}

export const RequireAuth = ({ children }: Props) => {
	const dispatch = useDispatch<Dispatch>()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			const {
				data,
				status
			} = await getUser(getUserId())

			if (status !== 200) {
				dispatch(setProfile({
					email: '',
					lastname: '',
					name: '',
					role: 2,
					username: '',
					photoUrl: '',
					isActive: true,
					emailConfirmed: false,
					authenticated: false
				}))
			} else {
				dispatch(setProfile({ ...data, authenticated: true }))
			}

			setLoading(false)
		})()
	}, [dispatch])

	return loading ? <Loader /> : children
}
