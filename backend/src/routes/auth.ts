import express from 'express'
import { check } from 'express-validator'

import {
	login,
	signup,
	recoveryPassword,
	resetPassword
} from '../controllers/auth'

const router = express.Router()

const EMAIL_EMPTY = 'email_empty'
const EMAIL_INVALID = 'email_invalid'
const PASSWORD_EMPTY = 'password_empty'

router.post('/login', [
	check('email').isEmail().withMessage(EMAIL_INVALID),
	check('email').isEmpty().withMessage(EMAIL_EMPTY),
	check('password').isEmpty().withMessage(PASSWORD_EMPTY)
], login)

router.post('/signup', [
	check('email').isEmail().withMessage(EMAIL_INVALID),
	check('name').isEmpty().withMessage('name_empty'),
	check('lastname').isEmpty().withMessage('lastname_empty'),
	check('username').isEmpty().withMessage('username_empty'),
	check('password').isEmpty().withMessage(PASSWORD_EMPTY),
	check('email').isEmpty().withMessage(EMAIL_EMPTY)
], signup)

router.post('/recovery-password', [
	check('email').isEmail().withMessage(EMAIL_INVALID),
	check('email').isEmpty().withMessage(EMAIL_EMPTY),
], recoveryPassword)

router.post('/reset-password/:token', resetPassword)

export default router