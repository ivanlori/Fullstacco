import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import 'dotenv/config'

import User from '../models/user'
import { handleErrorStatus } from './utils'

const imagePath = process.env.ROOT_FRONTEND_FOLDER_ABSOLUTE_PATH
const PAGINATION_LIMIT = 10

export const getUsers = async (
	req: Request,
	res: Response,
	//next: NextFunction
) => {
	const {
		page = 1,
		limit = PAGINATION_LIMIT
	} = req.query

	try {
		const usersTotal = await User.find()

		const users = await User
			.find()
			.limit(+limit * 1)
			.skip((+page - 1) * +limit)
			.exec()

		res.status(200).json({
			users,
			totalPages: Math.ceil(usersTotal.length / +limit),
			currentPage: +page
		})
	} catch (error) {
		console.log(error)
	}
}

export const getUser = (req: Request, res: Response, next: NextFunction) => {
	User.findById(req.params.id).then((user) => {
		res.status(200).json({
			_id: user._id,
			isActive: user.isActive,
			lastname: user.lastname,
			name: user.name,
			username: user.username,
			email: user.email,
			role: user.role,
			photoUrl: user.photoUrl,
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

const getExtension = (mimetype: string) => {
	let ext = ''

	if (mimetype === 'image/png') {
		ext = 'png'
	} else if (mimetype === 'image/jpg') {
		ext = 'jpg'
	} else {
		ext = 'jpeg'
	}

	return ext
}

const fileStorage = multer.diskStorage({
	destination(req, file, callback) {
		const feImagesFolderPath = `${imagePath}/public/images`
		callback(null, feImagesFolderPath)
	},
	filename(req, file, callback) {
		callback(null, `photo-profile.${getExtension(file.mimetype)}`)
	},
})

export const upload = multer({
	storage: fileStorage,
	fileFilter(req, file, callback) {
		if (
			file.mimetype === 'image/png' ||
			file.mimetype === 'image/jpg' ||
			file.mimetype === 'image/jpeg'
		) {
			callback(null, true)
		} else {
			callback(null, false)
		}
	},
}).single('photo')

export const uploadPhotoUser = async (
	req: Request, res: Response, next: NextFunction
) => {
	upload(req, res, function (err) {

		if (err instanceof multer.MulterError) {
			res.status(400).json({ err })
		} else if (err) {
			handleErrorStatus(err, next)
		}

		if (req.file) {
			const imageUrl = `/images/photo-profile.${getExtension(req.file.mimetype)}`

			User.findByIdAndUpdate(req.params.id, {
				...req.body,
				photoUrl: imageUrl
			}).then(() => {
				res.status(201).send({
					photo_url: imageUrl
				})
			}).catch((err) => handleErrorStatus(err, next))
		}
		res.end()
	})
}

export const removePhotoUser = async (
	req: Request, res: Response, next: NextFunction
) => {
	User.findByIdAndUpdate(req.params.id, {
		...req.body,
		photoUrl: ''
	}).then(() => {
		res.sendStatus(201)
	}).catch((err) => handleErrorStatus(err, next))
	res.status(201).send({
		photo_url: ''
	})
}

export const handleStatusUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	User.findByIdAndUpdate(req.params.id, {
		...req.body,
		isActive: req.body.activate
	}).then(() => {
		res.sendStatus(201)
	}).catch((err) => handleErrorStatus(err, next))
}
