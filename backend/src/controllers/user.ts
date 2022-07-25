import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

import User from '../models/user'
import { handleErrorStatus } from './utils'

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
	User.find().then((users) => {
		const usersModified = users.map((user) => {
			return {
				id: user._id,
				isActive: user.isActive,
				lastname: user.lastname,
				name: user.name,
				username: user.username,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			}
		})
		res.status(200).json([
			...usersModified
		])
	}).catch((err) => handleErrorStatus(err, next))
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
	User.findById(req.params.id).then((user) => {
		res.status(200).json({
			id: user._id,
			isActive: user.isActive,
			lastname: user.lastname,
			name: user.name,
			username: user.username,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		})
	}).catch((err) => handleErrorStatus(err, next))
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
	User.findByIdAndUpdate(req.params.id, req.body).then(() => {
		res.sendStatus(201)
	}).catch((err) => handleErrorStatus(err, next))
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
	User.findByIdAndDelete(req.params.id).then(() => {
		res.sendStatus(201)
	}).catch((err) => handleErrorStatus(err, next))
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
	const {
		name,
		lastname,
		username,
		email,
		password,
		emailConfirmed,
		isActive,
		role,
	} = req.body

	bcrypt.hash(password, 12).then((hashedPassword) => {
		const user = new User({
			name,
			lastname,
			username,
			email,
			password: hashedPassword,
			emailConfirmed,
			isActive,
			role,
			createdAt: new Date(),
			updatedAt: null
		})

		return user.save()
	}).then((result) => {
		return res.status(201).json({
			userId: result._id
		})
	}).catch((err) => handleErrorStatus(err, next))
}