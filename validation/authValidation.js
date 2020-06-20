const {check} = require('express-validator')
const User = require('../models/User')
const errors = require('../errors')

const loginValidators = [
	check('email', errors.EMAIL_INCORRECT.message).isEmail(),
	check('password', errors.PASSWORD_INCORRECT.message).trim().exists()
]

const registerValidators = [
	check('name', errors.NAME_INCORRECT.message).trim().exists(),
	check('email',errors.EMAIL_INCORRECT.message).isEmail()
		.custom(async email => {
			try {
				const user = await User.findOne({email})
				if (user){
					return new Promise.reject(errors.EMAIL_EXIST.message)
				}
				return true;
			} catch (e) {throw e}
		}),
	check('password', errors.PASSWORD_MINLENGTH.message).isLength({min: 6}),
	check('password', errors.PASSWORD_NOT_ALPHANUMERIC.message).isAlphanumeric(),
	check('repeat').custom((repeat, {req}) => {
		if (repeat === req.body.password) {
			return true
		} else {
			throw new Error(errors.REPEAT_INCORRECT.message)
		}
	})
]

module.exports = {
	registerValidators,
	loginValidators
}