import mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface IUser {
	_id: string
	name: string,
	lastname: string,
	username: string,
	email: string,
	password: string,
	emailConfirmed: string,
	isActive: boolean,
	role: number,
	createdAt: Date,
	updatedAt: Date,
	photoUrl: string
	resetToken: string | null,
	resetTokenExpiration: Date | undefined,
	save: () => void
}

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	emailConfirmed: {
		type: Boolean,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	role: Number,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	photoUrl: {
		type: String,
		required: false
	},
	updatedAt: Date,
	resetToken: String,
	resetTokenExpiration: Date,
})

export default mongoose.model('User', userSchema)
