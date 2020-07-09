import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../../hooks/useHttp";
import FormEdit from "../../components/forms/FormEdit/FormEdit";
import Loader from "../../components/Loader/Loader";
import useTitle from "../../hooks/useTitle";

const CourseEdit = () => {
	const [course, setCourse] = useState(null);
	const {request, loading} = useHttp()
	const {id} = useParams()
	useTitle('Редактирование курса')

	const fetchCourse = useCallback(async () => {
		try {
			const data = await request(`/api/course/${id}`)
			if (data) setCourse(data);
		} catch (e) {}
	}, [request, id])

	useEffect(() => {
		fetchCourse()
	}, [fetchCourse])

	if (loading || !course) return <Loader/>

	return (
		<section className="page">
			<h1>Редактирование курса</h1>
			<FormEdit
				course={course}
			/>
		</section>
	)
}

export default CourseEdit