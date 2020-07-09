import React, {useCallback, useEffect, useMemo, useState} from 'react'
import _ from 'lodash'
import {useSelector, shallowEqual} from "react-redux";
import {useHistory} from 'react-router-dom'
import Loader from "../../components/Loader/Loader";
import CoursesList from "../../components/Courses/CoursesList/CoursesList";
import {useHttp} from "../../hooks/useHttp";
import useTitle from "../../hooks/useTitle";


const Courses = () => {
	const [filteredCourses, setFilteredCourses] = useState([])
	const [courses, setCourses] = useState([])
	const {direction, filter} = useSelector(state => state.courses, shallowEqual)
	const history = useHistory()
	const {request, loading} = useHttp()
	useTitle('Список курсов')

	const fetchCourses = useCallback(async () => {
		try {
			const data = await request('/api/courses/');
			setCourses(data)
		} catch (e) {
		}
	}, [request])

	const filterCourses = useCallback(() => {
		const orderedCourses = _.orderBy(courses, [filter], [direction])
		setFilteredCourses(orderedCourses)
	}, [filter, courses, direction])

	useEffect(() => {
		filterCourses()
	}, [filterCourses])

	useEffect(() => {
		fetchCourses();
	}, [fetchCourses])

	const editCourseHandler = useCallback((id) => {
		history.push(`/course/edit/${id}`)
	}, [history])

	const readCourseHandler = useCallback(id => {
		history.push(`/course/${id}`);
	}, [history])

	const handlers = useMemo(() => ({readCourseHandler, editCourseHandler}),
		[readCourseHandler, editCourseHandler])

	return (
		<section className={'page'}>
			<h1 className='text-center'>Все курсы</h1>
			{
				loading ? <Loader/> : <CoursesList courses={filteredCourses} handlers={handlers}/>
			}
		</section>
	)
}

export default Courses