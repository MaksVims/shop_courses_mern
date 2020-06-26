import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../../hooks/useHttp";
import Loader from "../../components/Loader/Loader";
import {convertToCurrency, formatDate} from "../../other/utils";
import Button from "../../components/UI/Button/Button";
import './Course.scss'

const Course = () => {
	const {id} = useParams();
	const {loading, request} = useHttp()
	const [course, setCourse] = useState(null)

	const fetchCourse = useCallback(async () => {
		try {
			const data = await request(`/api/course/${id}`)
			if (data) setCourse(data);
		} catch (e) {}
	}, [request, id])

	useEffect(() => {
		fetchCourse()
	}, [fetchCourse])

	const addToCart = useCallback(id => {

	}, [])

	if (loading || !course) return <Loader/>

	return (
		<section className='page Course'>
			<h1 className="text-center">Информация о курсе</h1>
			<div className="row">
				<div className="col-sm-10 col-md-8 col-lg-6 m-sm-auto">
					<div className="card text-center">
						<div className="card-header">
							<h2>{`"${course.title}"`}</h2>
						</div>
						<div className="card-body">
							<img src={course.imgUrl} className="card-img" alt={course.title} />
							<h6 className="card-title">Цена: {convertToCurrency(course.price)}</h6>
							<p className="card-text">{course.description || 'Описания нет'}</p>

						</div>
						<div className="card-footer text-muted">
							<div className="card-footer-btnWrapper">
								<div>
									<p>Автор: {course.userId.name}</p>
									<p>Email: {course.userId.email}</p>
									<p>Приобрели: {course.buysCount}</p>
									<p>Рейтинг: {course.favorites.length}</p>
								</div>
								<Button
									label={'Добавить в корзину'}
									onClick={() => addToCart(course._id)}
								/>
							</div>
							<p>Дата: {formatDate(new Date(course.dateCreate))}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Course