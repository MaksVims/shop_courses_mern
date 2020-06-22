const {Schema, model, Types} = require('mongoose')

const orderSchema = new Schema({
	courses: [
		{
			course: {type: Object, required: true},
			count: {type: Number, required: true}
		}
	],
	userId: {type: Types.ObjectId, ref: 'User', required: true},
	date: {type: Date, default: Date.now}
})

module.exports = model('Order', orderSchema)