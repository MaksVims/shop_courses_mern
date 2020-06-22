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

userSchema.methods.addToCart = function(id) {
	const items = [...this.cart.items];

	const idx = items.findIndex(course => {
		return course.courseId.toString() === id.toString()
	})

	if (idx === -1) {
		items.push({count: 1, courseId: id})
	} else {
		items[idx].count += 1;
	}

	this.cart = {items}
	return this.save()
}

userSchema.methods.removeToCart = function(id) {
	let items = [...this.cart.items]

	const idx = items.findIndex(course => {
		return course.courseId.toString() === id.toString()
	})
	const course = items[idx];

	if (course.count <= 1) {
		items = items.filter(course => course.courseId.toString() !== id.toString())
	} else {
		course.count -= 1;
		items[idx] = course;
	}

	this.cart = {items};
	return this.save();
}

userSchema.methods.clearCart = function() {
	this.cart = {items: []}
	return this.save();
}


module.exports = model('User', userSchema)

