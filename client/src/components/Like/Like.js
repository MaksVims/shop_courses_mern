import React, {useCallback, useContext, useState} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import classes from './Like.module.scss'
import {useHttp} from "../../hooks/useHttp";
import {AuthContext} from "../../context/auth/AuthContext";
import ReactTooltip from "react-tooltip";
import shortid from 'shortid'

const Like = (props) => {
	const [active, setActive] = useState(props.active);
	const [count, setCount] = useState(props.count)
	const {request} = useHttp()
	const {token} = useContext(AuthContext)
	const id = shortid.generate()

	const {show = false, courseId} = props
	const cls = [classes.LikeIconWrapper]
	const color = !active ? 'action' : 'error'
	const url = active ? '/api/course/rem_favorite' : '/api/course/add_favorite'

	const toggleFavorite = useCallback(async () => {
		try {
			await request(url, 'POST', {id: courseId}, {
				authorization: `Bearer ${token}`
			}, false)
			setActive(!active);
			setCount(prev => !active ? prev + 1 : prev - 1)
		} catch (e) {
		}
	}, [request, token, url, active])


	return (
		<div className={cls.join(' ')}>
			<FavoriteIcon
				onClick={toggleFavorite}
				className={classes.LikeIcon}
				data-tip={'Оценить'}
				data-for={id}
				color={color}/>
			<small>{show ? count : null}</small>
			<ReactTooltip delayShow={300} place={"left"} id={id} effect={"solid"}/>
		</div>
	)
}

export default Like