const {Router} = require('express')
const authJWT = require('../middleWare/authJWT')
const User = require('../models/User')
const Order = require('../models/Order')
const errorsData = require("../errors");

const route = new Router()

route.post('/', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId})
		const orders = await Order.find({userId: req.user.userId})

		if (user) {
			res.json({user, makeOrders: orders.length})
		}

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/save', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId})
		const changed = {name: req.body.name, bio: req.body.bio}
		Object.assign(user, changed)

		await user.save()
		res.json({});
	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/save_avatar', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId})

		if (req.body.avatar) {
			console.log(req.body.avatar)
		}

		await user.save()
		res.json({});
	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

module.exports = route;
