const {check} = require('express-validator')
const {isUrl} = require('validator')
const errorsData = require('../errors')

//title, price, imgUrl, description

const courseValidation = [
	check('title', errorsData.TITLE_INCORRECT).exists(),
	check('price', errorsData.PRICE_INCORRECT).isNumeric(),
	check('imgUrl').custom(url => {
		if (url) {
			if (isUrl(url)) {
				return true;
			} else {
				throw new Error(errorsData.URL_INCORRECT.message)
			}
		}
		return true
	})
]

module.exports = courseValidation