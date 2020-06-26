const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images')
	},

	filename: (req, file, callback) => {
		callback(null, Date.now() + ' ' + file.originalname)
	}
})

const allowedTypes = ['images/jpg', "images/jpeg", "images/png"];

const fileFilter = (req, file, callback) => {
	if (allowedTypes.includes(file.mimetype)) {
		callback(null, true)
	} else {
		callback(null, false)
	}
}

module.exports = multer({
	fileFilter, storage
})