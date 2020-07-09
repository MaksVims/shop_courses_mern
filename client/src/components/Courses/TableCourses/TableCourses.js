import React, {useContext} from 'react'
import './TableCourses.scss'
import {convertToCurrency, formatDate} from "../../../other/utils";
import {AuthContext} from "../../../context/auth/AuthContext";
import {useAddToCart} from "../../../hooks/useAddToCart";
import ReactTooltip from "react-tooltip";
import shortid from 'shortid'

const TableCourses = (props) => {
	const {courses, readCourseHandler} = props
	const {isAuth} = useContext(AuthContext)
	const addToCart = useAddToCart('/api/cart/addCourse')
	const id = shortid.generate()

	return (
		<>
			<table className="table table-courses">
				<thead className="thead-dark">
				<tr>
					<th scope="col">№</th>
					<th scope="col">Название</th>
					<th scope="col">Цена</th>
					<th scope="col">Автор</th>
					<th scope="col">Дата создания</th>
					{isAuth ? <th scope="col">Добавить</th> : null}
				</tr>
				</thead>
				<tbody>
				{
					courses.map((course, idx) => (
						<tr key={course.title + idx}>
							<th scope="row">{idx + 1}</th>
							<td
								className={"read-course"}
								onClick={() => readCourseHandler(course._id)}
								data-for={id}
								data-tip={'Перейти к курсу'}
							>{course.title}</td>
							<td>{convertToCurrency(course.price)}</td>
							<td>{course.userId.name}</td>
							<td>{formatDate(new Date(course.dateCreate))}</td>
							{isAuth
								? <td className="row-icon">
									<i
										onClick={() => addToCart(course._id)}
										className="fa fa-plus"
										data-tip={'Добавить в корзину'}
									> </i>
								</td>
								: null}
						</tr>
					))
				}
				</tbody>
			</table>
			<ReactTooltip delayShow={300} place={"right"}/>
			<ReactTooltip delayShow={300} place={"bottom"} id={id}/>
		</>
	)
}

export default TableCourses