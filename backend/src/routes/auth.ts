import express from 'express'
import { check } from 'express-validator'

import {
	login,
	signup,
	recoveryPassword,
	resetPassword,
} from '../controllers/auth'
import User from '../models/user'

const router = express.Router()

const EMAIL = 'email'

// msg errors
const EMAIL_EMPTY = 'email_empty'
const EMAIL_INVALID = 'email_invalid'
const EMAIL_USED = 'email_already_used'
const PASSWORD_EMPTY = 'password_empty'


router.post('/login', [
	check(EMAIL).isEmail().withMessage(EMAIL_INVALID),
	check(EMAIL).not().isEmpty().withMessage(EMAIL_EMPTY),
	check('password').isEmpty().withMessage(PASSWORD_EMPTY)
], login)

router.post('/signup', [
	check(EMAIL).isEmail().withMessage(EMAIL_INVALID),
	check(EMAIL).not().isEmpty().withMessage(EMAIL_EMPTY),
	check(EMAIL).custom(value => {
		return User.findOne({ email: value }).then((user) => {
			if (user) {
				return Promise.reject(EMAIL_USED)
			}
		})
	}),
	check('name').not().isEmpty().withMessage('name_empty'),
	check('lastname').not().isEmpty().withMessage('lastname_empty'),
	check('username').not().isEmpty().withMessage('username_empty'),
	check('password').not().isEmpty().withMessage(PASSWORD_EMPTY),

], signup)

router.post('/recovery-password', [
	check(EMAIL).isEmail().withMessage(EMAIL_INVALID),
	check(EMAIL).isEmpty().withMessage(EMAIL_EMPTY),
], recoveryPassword)

router.post('/reset-password/:token', resetPassword)

export default router
