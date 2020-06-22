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

module.exports = {
	mapCoursesToCart,
	calcToTotalPrice,
	mapCourseToOrder,
	mapOrders
}