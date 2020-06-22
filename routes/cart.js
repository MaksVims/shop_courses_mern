const {Router} = require('express')
const errorsData = require("../errors");
const authJWT = require('../middleWare/authJWT')
const User = require('../models/User')
const {mapCoursesToCart, calcToTotalPrice} = require('./helpers')

const route = new Router()

route.post('/addCourse', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId})
		await user.addToCart(req.body.id)
		res.json({})
	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/remove', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId})
		await user.removeToCart(req.body.id)
		res.json({})

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/', authJWT, async (req, res) => {
	try {
		const user = await User.findOne({_id: req.user.userId}).populate('cart.items.courseId').exec()
		const courses = mapCoursesToCart(user.cart.items)
		res.json({courses, totalPrice: calcToTotalPrice(courses)})
	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

module.exports = route;