const mapCoursesToCart = (courses) => {
	return courses.map(course => ({
		...course.courseId._doc,
		count: course.count
	}))
}

const calcToTotalPrice = (courses) => {
	return courses.reduce((res, course) => res + +course.price ,0)
}

module.exports = {
	mapCoursesToCart,calcToTotalPrice
}