const {Router} = require('express')
const errorsData = require('../errors')
const successData = require('../success')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const {validationResult} = require('express-validator')

const {loginValidators, registerValidators} = require('../validation/authValidation')

const route = new Router()

route.post('/login', loginValidators, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(errorsData.VALIDATION_ERROR.code)
			.json({message: errors.array()[0].msg})
	}

	try {
		const {email, password} = req.body
		const user = await User.findOne({email})

		if (!user) {
			const {code, message} = errorsData.EMAIL_NOT_EXIST
			return res.status(code).json({message})
		}

		const samePassword = await bcrypt.compare(password, user.password)
		if (!samePassword) {
			const {code, message} = errorsData.PASSWORD_NOT_SAME;
			return res.status(code).json({message})
		}

		const token = jwt.sign(
			{userId: user._id},
			keys.SECRET_JWT,
			{expiresIn: '1h'})

		res.json({token, userId: user._id})

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

route.post('/register', registerValidators, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(errorsData.VALIDATION_ERROR.code)
			.json({message: errors.array()[0].msg})
	}
	try {
		const {name, email, password} = req.body;
		const hashPassword =  await bcrypt.hash(password, 10);
		const user = new User({
			name, email, password: hashPassword, cart: {items: []}
		})

		await user.save()
		return res.status(successData.USER_REGISTER.code).json({user})

	} catch (e) {
		res.status(errorsData.COMMON.code).json({message: errorsData.COMMON.message})
	}
})

module.exports = route