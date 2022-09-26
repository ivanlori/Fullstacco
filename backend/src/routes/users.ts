import express from 'express'

import {
	getUsers,
	createUser,
	getUser,
	deleteUser,
	updateUser,
	uploadPhotoUser,
	removePhotoUser
} from '../controllers/user'
import { isAuthenticated } from '../middleware/is_auth'

const router = express.Router()

router.get('/', isAuthenticated, getUsers)
router.post('/create', isAuthenticated, createUser)
router.get('/:id', isAuthenticated, getUser)
router.delete('/:id', isAuthenticated, deleteUser)
router.patch('/:id', isAuthenticated, updateUser)
router.patch('/:id/photo', isAuthenticated, uploadPhotoUser)
router.delete('/:id/photo', isAuthenticated, removePhotoUser)

export default router
