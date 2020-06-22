import React from 'react'
import './CartView.scss'
import {convertToCurrency} from "../../other/utils";
import Button from "../UI/Button/Button";

function getRowsToCart(courses, onClick) {
	return courses.map((course, idx) => (
		<tr key={course.title + idx}>
			<th scope="row">{idx + 1}</th>
			<td>{course.title}</td>
			<td>{convertToCurrency(course.price)}</td>
			<td>{course.count}</td>
			<td>
				<Button
					label={'Удалить'}
					className={'danger inversion'}
					onClick={() => onClick(course._id)}
				/>
			</td>
		</tr>
	))
}


const CartView = (props) => {
	const {cart: {courses}, onClick} = props
  return (
		<table className="table table-cart">
			<thead className="thead-dark">
			<tr>
				<th scope="col">№</th>
				<th scope="col">Название</th>
				<th scope="col">Цена</th>
				<th scope="col">Количество</th>
				<th scope="col">Действия</th>
			</tr>
			</thead>
			<tbody>
			{getRowsToCart(courses, onClick)}
			</tbody>
		</table>
  )
}

export default CartView