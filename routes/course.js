const {Router} = require('express')
const {validationResult} = require('express-validator')
const courseValidation = require('../validation/courseValidation')
const errorsData = require("../errors");
const successCodes = require("../successCodes");
const Course = require('../models/Course')
const authJWT = require('../middleWare/authJWT')

const route = new Router();

route.post('/create', authJWT, courseValidation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(errorsData.VALIDATION_ERROR.code)
			.json({message: errors.array()[0].msg})
	}

	try {
		const {title, price, imgUrl, description} = req.body
		const course = new Course({
			title, price, imgUrl, description, userId: req.user.userId
		})

		await course.save()
		res.status(successCodes.CREATE).json({course})

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.get('/:id', async (req, res) => {
	try {
		const course = await Course.findById(req.params.id)
			.populate('userId').exec();

		if (course) {
			res.json({course})
		} else {
			const {code, message} = errorsData.COURSE_NOT_FOUND;
			res.status(code).json({message})
		}
	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/:id/edit', authJWT, courseValidation, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(errorsData.VALIDATION_ERROR.code)
			.json({message: errors.array()[0].msg})
	}
	try {
		const {id} = req.body
		delete req.body[id];
		await Course.findByIdAndUpdate(id, req.body)
		res.json({})
	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/delete', authJWT, async (req, res) => {
	try {
		const {id} = req.body;
		await Course.deleteOne({_id: id});
		res.json({})
	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

module.exports = route