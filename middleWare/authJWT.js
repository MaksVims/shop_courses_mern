const jwt = require('jsonwebtoken')
const keys = require('../keys')
const errorsData = require('../errors')

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			const {code, message} = errorsData.AUTH_ERROR
			return res.status(code).json({message})
		}

		const uncoded = jwt.verify(token, keys.SECRET_JWT);
		req.user = uncoded;
		next()
	} catch (e) {
		const {code, message} = errorsData.AUTH_ERROR
		return res.status(code).json({message})
	}
}