
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

import crypto from 'crypto'

import 'dotenv/config'
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

export const login = (req: Request, res: Response, next: NextFunction) => {
	const email = req.body.email
	const password = req.body.password

	User.findOne({ email: email })
		.then((user: IUser) => {
			if (!user) {
				res.status(401).json({
					message: 'user_not_exists'
				})

				return
			} else {
				loadedUser = user

				bcrypt.compare(password, user.password).then((isEqual) => {

					if (!isEqual) {
						return res.status(401).json({
							message: 'wrong_password'
						})
					} else {
						jwt.sign({
							email: loadedUser.email,
							userId: loadedUser._id
						},
							String(process.env.SECRET_KEY),
							{ expiresIn: '24h' },
							(err, token) => {
								if (token) {
									res.status(200).json({
										token, userId: loadedUser._id
									})
								}

								if (err) {
									console.log(err)
								}
							})
					}
				})
			}
		})
		.catch((err) => handleErrorStatus(err, next))
}

export const signup = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req).array()
	if (errors) {
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
		res.status(201).json({
			message: 'waiting_confirmation_email',
			userId: result._id
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
					message: 'email_not_exists'
				})
			}

			user.resetToken = token
			user.resetTokenExpiration = Date.now() + 3600000
			return user.save()
		}).then(() => {
			res.status(201).json({
				message: 'email_recovery_password_sent'
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
					message: "token_not_valid"
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
				message: 'reset_password_done'
			})
		}).catch((err) => handleErrorStatus(err, next))
}