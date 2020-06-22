import React from 'react'
import {convertToCurrency, formatDate} from "../../../other/utils";
import './OrderItem.scss'

const OrderItem = ({order}) => {
	return (
		<div className="card order-card">
			<div className="card-header  text-center">
				<strong>Заказ №{order._id}</strong>
			</div>
			<div className="card-body">
				<h5 className="card-title">Заказчик:&nbsp;
					<em>{order.userId.name}</em>
				</h5>
				<h5 className="card-title">Email:&nbsp;
					<em>{order.userId.email}</em>
				</h5>
				<ol>Список товаров:
					{
						order.courses.map(item => (
							<li className="card-text"> - {item.course.title} - ({item.count})</li>
						))
					}
				</ol>
				<p className="card-text">Итого: {convertToCurrency(order.totalPrice)}</p>
			</div>
			<div className="card-footer text-muted">
				Дата: {formatDate(new Date(order.date))}
			</div>
		</div>
	)
}

export default OrderItem