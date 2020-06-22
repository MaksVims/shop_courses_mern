const express = require('express')
const mongoose = require('mongoose')
const keys = require('./keys')

const app = express()

app.use(express.json({extends: true}));

app.use('/api/courses', require('./routes/courses'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/course', require('./routes/course'))
app.use('/api/cart', require('./routes/cart'))
app.use('/api/order', require('./routes/order'))

const connect = async () => {
	try {
		mongoose.set('useCreateIndex', true)
		await mongoose.connect(keys.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
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