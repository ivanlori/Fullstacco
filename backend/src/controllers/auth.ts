
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import crypto from 'crypto'

import 'dotenv/config'
import {
	EMAIL_NOT_EXISTS,
	EMAIL_RECOVERY_SENT,
	RESET_PASSWORD_DONE,
	TOKEN_NOT_VALID,
	USER_NOT_EXISTS,
	WAITING_CONFIRMATION_EMAIL,
	WRONG_PASSWORD
} from '../messages'
import User, { IUser } from '../models/user'
import { handleErrorStatus } from './utils'

let loadedUser = {
	email: '',
	_id: ''
}

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: Number(process.env.EMAIL_PORT),
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD
	}
})

const signToken = (
	email: string,
	userId: string,
	callback: (token: string) => void
) => {
	jwt.sign({
		email,
		userId
	},
		String(process.env.SECRET_KEY),
		{ expiresIn: '24h' },
		(err, token) => {
			if (token) {
				callback(token)
			}

			if (err) {
				console.log(err)
			}
		})
}

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const email = req.body.email
	const password = req.body.password

	User.findOne({ email: email })
		.then((user: IUser) => {
			if (!user) {
				res.status(401).json({
					message: USER_NOT_EXISTS
				})

				return
			} else {
				loadedUser = user

				bcrypt.compare(password, user.password).then((isEqual) => {

					if (!isEqual) {
						return res.status(401).json({
							message: WRONG_PASSWORD
						})
					} else {
						signToken(loadedUser.email, loadedUser._id, (token) => {
							res.status(200).json({
								token,
								userId: loadedUser._id
							})
						})
					}
				})
			}
		})
		.catch((err) => handleErrorStatus(err, next))
}

export const signup = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req).array()

	if (errors.length > 0) {
		return res.status(400).json({ errors })
	}

	const {
		name,
		lastname,
		email,
		username,
		password,
	} = req.body

	bcrypt.hash(password, 12).then((hashedPassword) => {
		const user = new User({
			name,
			lastname,
			email,
			username,
			password: hashedPassword,
			createdAt: new Date(),
			lastUpdated: null,
			emailConfirmed: false
		})

		return user.save()
	}).then((result) => {
		signToken(result.email, result._id, (token) => {
			res.status(201).json({
				message: WAITING_CONFIRMATION_EMAIL,
				token,
				userId: result._id
			})
		})

		return transporter.sendMail({
			to: email,
			from: 'Fullstacco',
			subject: 'You are in!',
			html: `
				<h1>Welcome to Fullstacco ${username}!</h1>
				<p>
					Everything is setup! You can start you're journey on Fullstacco!
				</p>
				`
		})
	}).catch((err) => handleErrorStatus(err, next))
}

export const recoveryPassword = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			return res.redirect('/reset')
		}

		const token = buffer.toString('hex')

		User.findOne({ email: req.body.email }).then((user) => {
			if (!user) {
				res.status(400).json({
					message: EMAIL_NOT_EXISTS
				})
			}

			user.resetToken = token
			user.resetTokenExpiration = Date.now() + 3600000
			return user.save()
		}).then(() => {
			res.status(201).json({
				message: EMAIL_RECOVERY_SENT,
				token
			})
			return transporter.sendMail({
				to: req.body.email,
				from: 'Fullstacco',
				subject: 'Change your email',
				html: `
				<h1>Fullstacco - Recover your password</h1>
				<p>Hi, click on the link below to recover your password:
				<a href="${process.env.CLIENT_DOMAIN}/reset-password/${token}">Recover password link</a>
				</p>
				`
			})
		}).catch((err) => handleErrorStatus(err, next))
	})
}

export const resetPassword = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.params.token
	const newPassword = req.body.password

	let resettedUser: IUser

	User
		.findOne({
			resetToken: token,
			resetTokenExpiration: { $gt: Date.now() }
		})
		.then((user) => {
			if (!user) {
				res.status(400).json({
					message: TOKEN_NOT_VALID
				})
			}

			resettedUser = user
			return bcrypt.hash(newPassword, 12)
		}).then((hashedPassword) => {
			resettedUser.password = hashedPassword
			resettedUser.resetToken = null
			resettedUser.resetTokenExpiration = undefined

			return resettedUser.save()
		}).then(() => {
			res.status(201).json({
				message: RESET_PASSWORD_DONE
			})
		}).catch((err) => handleErrorStatus(err, next))
}
