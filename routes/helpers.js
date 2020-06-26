const Course = require('../models/Course')

const mapCoursesToCart = (courses) => {
	return courses.map(course => ({
		...course.courseId._doc,
		count: course.count
	}))
}

const mapCourseToOrder = (courses) => {
	return courses.map(course => ({
		course: course.courseId._doc,
		count: course.count
	}))
}

const calcToTotalPrice = (courses) => {
	return courses.reduce((res, course) => res + +course.price, 0)
}

const mapOrders = (orders) => {
	return orders.map(order => ({
		...order._doc,
		totalPrice: order.courses.reduce((res, course) => {
			res += course.course.price * course.count;
			return res;
		}, 0)
	}))
}

async function changeBuyCourses(courses) {
	return new Promise( (resolve, reject) => {
			courses.forEach( async item => {
			try {
				const {course} = item
				course.buysCount += +item.count

				await Course.findByIdAndUpdate(course._id, course)
				resolve(true)
			} catch (e) {
				reject(e.message)
			}
		})
	})
}

module.exports = {
	mapCoursesToCart,
	calcToTotalPrice,
	mapCourseToOrder,
	mapOrders,
	changeBuyCourses,
}