const {Router} = require('express')
const authJWT = require('../middleWare/authJWT')
const errorsData = require("../errors")
const Order = require('../models/Order')
const User = require('../models/User')
const {mapCourseToOrder, mapOrders} = require('./helpers')

const route = new Router()

route.post('/create', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId}).populate('cart.items.courseId').exec()
		const courses = mapCourseToOrder(user.cart.items);

		const order = new Order({
			userId: req.user.userId, courses
		})

		await order.save();
		await user.clearCart();
		res.json({})

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/all', authJWT, async (req, res) => {
	try {
		const orders = await Order.find({userId: req.user.userId}).populate('userId').exec()
		res.json(mapOrders(orders))

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

module.exports = route;