const {Router} = require('express')
const authJWT = require('../middleWare/authJWT')
const User = require('../models/User')
const Order = require('../models/Order')
const errorsData = require("../errors");
const Course = require('../models/Course')
const {mapOrders} = require('./helpers')


const route = new Router()

route.post('/', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId})
		let orders = await Order.find({userId: req.user.userId})

		if (user) {
			const userCourses = await Course.find({userId: user._id})
			orders = mapOrders(orders);

			const info = {
				makeOrders: orders.length,
				courseCreate: userCourses.length,
				totalSummary: orders.reduce((acc, cur) => acc += cur.totalPrice, 0),
				likes: user.favoriteCourses.length
			}

			res.json({user, info})
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
