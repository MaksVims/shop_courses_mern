import React, {useCallback, useContext} from 'react'
import './HCardCourse.scss'
import {formatDate, convertToCurrency} from "../../../other/utils";
import Button from "../../UI/Button/Button";
import {AuthContext} from "../../../context/auth/AuthContext";
import Like from "../../Like/Like";

const HCardCourses = (props) => {
	const {title, price, imgUrl, dateCreate, _id, userId: {_id: id}, favorites} = props
	const {readCourseHandler, editCourseHandler, addToCart} = props
	const {isAuth, userId} = useContext(AuthContext)
	const same = userId === id;

	const isActive = useCallback(() => {
		return favorites.includes(userId)
	}, [userId, favorites])

	return (
		<div className="card mb-3 horizontal-card-course" style={{maxWidth: '720px'}}>
			<div className="row no-gutters">
				<div className="col-md-4 card-img">
					<img src={imgUrl} className="card-img" alt={title}/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<div>
							<h3 className="card-title">{title}</h3>
							<h6 className="card-title">Стоимость: {convertToCurrency(price)}</h6>
							<p className="card-text">
								<small className="text-muted">Создан: {formatDate(new Date(dateCreate))}</small>
							</p>
						</div>
						<div className={"btn-panel"}>
							<Button
								label={"Подробнее"}
								className={'primary inversion'}
								onClick={() => readCourseHandler(_id)}
							/>
							{!isAuth || !same ? null
								: <Button
									label={"Редактировать"}
									className={'simple inversion'}
									onClick={() => editCourseHandler(_id)}
								/>
							}
							{!isAuth ? null
								: <Button
									label={"Добавить"}
									className={'warning inversion'}
									onClick={() => addToCart(_id)}
								/>
							}
						</div>
					</div>
				</div>
			</div>
			<Like
				active={isActive()}
				count={favorites.length}
				courseId={_id}
			/>
		</div>
	)
}

export default HCardCourses