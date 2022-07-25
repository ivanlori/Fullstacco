import mongoose from 'mongoose'

const Schema = mongoose.Schema

const accountSchema = new Schema({
	name: {
		first: {
			type: String,
			required: true
		},
		last: {
			type: String,
			required: true
		},
	},
	created: Date
})

export default mongoose.model('Account', accountSchema)
