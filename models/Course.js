const {Schema, model, Types} = require('mongoose')

const courseSchema = new Schema({
	title: {type: String, required: true, unique: true, maxLength: 100},
	price: {type: Number, required: true, minValue: 1},
	imgUrl: {type: String},
	description: {type:String},
	userId: {type: Types.ObjectId, ref: 'User', required: true},
	dateCreate: {type:Date, default:Date.now}
})

module.exports = model('Course', courseSchema)