import React from 'react'
import HCardCourses from "../HCardCourses/HCardCourses";
import PanelCourses from "../PanelCourses/PanelCourses";
import './CourseList.scss'
import {useSelector} from "react-redux";
import TableCourses from "../TableCourses/TableCourses";

const CoursesList = (props) => {
	const modeView = useSelector(state => state.courses.modeView)
	const {courses, handlers} = props

	if (!courses.length) return <h6>Активных курсов нет</h6>

	return (
		<div className={"course-list"}>
			<PanelCourses/>
			{modeView === 'table' ? <TableCourses courses={courses} {...handlers}/>
			:	courses.map(course => (
				<HCardCourses
					key={course._id}
					{...course}
					{...handlers}
				/>
			))}
		</div>
	)
}

export default CoursesList