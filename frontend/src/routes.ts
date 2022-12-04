const userEdit = 'edit'
const userNew = 'new'
const profile = 'profile'
const user = 'user'
const userList = 'list'
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
export const dashboardUser = `${dashboard}/${user}`
export const dashboardUserList = `${dashboardUser}/${userList}`
export const dashboardUserEdit = `${dashboardUser}/${userEdit}`
export const dashboardUserNew = `${dashboardUser}/${userNew}`
export const dashboardProfile = `${dashboard}/${profile}`
