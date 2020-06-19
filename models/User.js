const {Schema, model, Types} = require('mongoose')

const userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	cart: {
		items: [
			{
				count: {type: Number, required: true, default: 1},
				courseId: {type: Types.ObjectId, ref: 'Course', required: true}
			}
		]
	},
	bio: {type: String},
	avatarUrl: {type: String},
	createCourse: {type: Number, default: 0},
	dateRegister: {type: Date, default: Date.now}
})

module.exports = model('User', userSchema)

