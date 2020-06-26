const {Schema, model, Types} = require('mongoose')

const courseSchema = new Schema({
	title: {type: String, required: true, unique: true, maxLength: 100},
	price: {type: Number, required: true, minValue: 1},
	imgUrl: {type: String},
	description: {type: String},
	userId: {type: Types.ObjectId, ref: 'User', required: true},
	dateCreate: {type: Date, default: Date.now},
	buysCount: {type:Number, default: 0},
	favorites: [
		{
			type: String,
		}
	]
})

courseSchema.methods.addToFavorites = function (userId) {
	const favorites = [...this.favorites];
	const idx = favorites.findIndex(id => id.toString() === userId.toString())
	if (idx !== -1) {
		return Promise.resolve()
	} else {
		favorites.push(userId.toString())
		this.favorites = favorites;
		return this.save();
	}
}

courseSchema.methods.removeToFavorites = function (userId) {
	let favorites = [...this.favorites];
	favorites = favorites.filter(id => id.toString() !== userId.toString())
	this.favorites = favorites;
	return this.save();
}

module.exports = model('Course', courseSchema)

