import React, {useCallback} from 'react'
import './PanelCourses.scss'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actionChangeSortFilter, actionSwitchMode, actionToggleDuration} from "../../../store/actions/coursesActions";
import ReactTooltip from "react-tooltip";
import shortid from 'shortid'

const PanelCourses = () => {
	const {direction, filter, modeView} = useSelector(state => state.courses, shallowEqual)
	const dispatch = useDispatch()
	const id = shortid.generate()

	const IconDirection = props => direction === 'asc'
		? <i className="fa fa-arrow-circle-down active" {...props} data-tip='По убыванию' data-for={id}> </i>
		: <i className="fa fa-arrow-circle-up active" {...props} data-tip='По возврастанию' data-for={id}> </i>

	const clickHandler = useCallback(() => {
		dispatch(actionToggleDuration())
	}, [dispatch])

	const changeFilter = useCallback((e) => {
		dispatch(actionChangeSortFilter(e.target.value))
	}, [dispatch])

	const changeMode = useCallback(() => {
		dispatch(actionSwitchMode())
	}, [dispatch])

	return (
		<div className={'panel-courses'}>
			<select
				className="form-control"
				value={filter}
				onChange={changeFilter}
			>
				<option value="title">Сортировать по названию</option>
				<option value="price">Сортировать по цене</option>
				<option value="dateCreate">Сортировать по дате</option>
			</select>
			<IconDirection
				onClick={clickHandler}
			/>
			<i
				className={`fa fa-table ${modeView === 'table' ? 'active' : null}`}
				data-tip='Переключить вид'
				onClick={changeMode}
			> </i>
			<ReactTooltip delayShow={300} effect={"solid"} delayHide={0} delayUpdate={0}/>
			<ReactTooltip delayShow={300} effect={"solid"} delayHide={0} delayUpdate={0} id={id}/>
		</div>
	)
}

export default PanelCourses