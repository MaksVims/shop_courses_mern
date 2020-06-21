const {Router} = require('express')
const errorsData = require("../errors");
const Course = require('../models/Course')


const route = new Router();

route.get('/', async (req, res) => {
	try {
		const courses = await Course.find().populate('userId').exec()
		res.json(courses);

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

module.exports = route