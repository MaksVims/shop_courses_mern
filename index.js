const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys')

const app = express()

const connect = async () => {
	try {
		await mongoose.connect(keys.MONGO_URI);
		app.listen(keys.PORT, () => {
			console.log(`Server run, port: ${keys.PORT}`)
		})
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
}

connect()