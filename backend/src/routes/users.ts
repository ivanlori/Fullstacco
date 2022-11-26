import express from 'express'

import {
	getUsers,
	createUser,
	getUser,
	deleteUser,
	updateUser,
	uploadPhotoUser,
	removePhotoUser,
	handleStatusUser
} from '../controllers/user'
import { isAuthenticated } from '../middleware/is_auth'

const usersRouter = express.Router()

usersRouter.get('/', isAuthenticated, getUsers)
usersRouter.post('/create', isAuthenticated, createUser)
usersRouter.get('/:id', isAuthenticated, getUser)
usersRouter.delete('/:id', isAuthenticated, deleteUser)
usersRouter.patch('/:id', isAuthenticated, updateUser)
usersRouter.patch('/:id/photo', isAuthenticated, uploadPhotoUser)
usersRouter.patch('/:id/activate', isAuthenticated, handleStatusUser)
usersRouter.delete('/:id/photo', isAuthenticated, removePhotoUser)

export {
	usersRouter
}
