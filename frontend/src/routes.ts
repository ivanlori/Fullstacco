const editUser = 'edit'
const newUser = 'new'
const profile = 'profile'
const users = 'users'
const home = 'home'

// public paths
export const login = '/login'
export const signup = '/signup'
export const recoveryPassword = '/recovery-password'
export const noAccess = '/no-access'
export const resetPassword = '/reset-password'

// private routes
export const dashboard = '/dashboard'
export const dashboardHome = `${dashboard}/${home}`
export const dashboardUsers = `${dashboard}/${users}`
export const dashboardProfile = `${dashboard}/${profile}`
export const dashboardEditUser = `${dashboardUsers}/:id/${editUser}`
export const dashboardNewUser = `${dashboardUsers}/${newUser}`
