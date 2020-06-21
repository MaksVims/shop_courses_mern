import React, {useCallback} from 'react'
import './PanelCourses.scss'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {actionChangeSortFilter, actionSwitchMode, actionToggleDuration} from "../../../store/actions/coursesActions";

const PanelCourses = () => {
	const {duration, filter, modeView} = useSelector(state => state.courses, shallowEqual)
	const dispatch = useDispatch()

	const IconDuration = props => duration === 'asc'
		? <i className="fa fa-arrow-circle-down active" {...props}> </i>
		: <i className="fa fa-arrow-circle-up active" {...props}> </i>

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
			<IconDuration
				onClick={clickHandler}
			/>
			<i
				className={`fa fa-table ${modeView === 'table' ? 'active' : null}`}
				onClick={changeMode}
			> </i>
    </div>
  )
}

export default PanelCourses