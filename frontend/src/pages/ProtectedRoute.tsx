import { ReactElement } from "react"

import { Navigate } from "react-router-dom"

import { isAuthenticated } from "utils/utils"

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {

	if (!isAuthenticated()) return <Navigate to="/login" />

	return children
}