const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys')

const app = express()

app.use(express.json({extends: true}));
app.use('/api/auth', require('./routes/auth'))

const connect = async () => {
	try {
		await mongoose.connect(keys.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(keys.PORT, () => {
			console.log(`Server run, port: ${keys.PORT}`)
		})
	} catch (e) {
		console.log(e)
		process.exit(1)
	}
}

connect()