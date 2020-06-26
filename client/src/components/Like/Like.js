import React, {useCallback, useContext, useState} from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import classes from './Like.module.scss'
import {useHttp} from "../../hooks/useHttp";
import {AuthContext} from "../../context/auth/AuthContext";

const Like = (props) => {
	const [active, setActive] = useState(props.active);
	const [count, setCount] = useState(props.count)
	const {request} = useHttp()
	const {token} = useContext(AuthContext)

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
				color={color}/>
			<small>{show ? count : null}</small>
		</div>
	)
}

export default Like