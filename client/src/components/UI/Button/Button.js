import React from 'react'
import classes from './Button.module.scss'

const Button = props => {
	const {label, onClick = f => f, style = {}, type='button', disabled=false, className=''} = props
	const cls = [classes.Button];

	if (className) {
		className.split(' ').forEach(c => {
			cls.push(classes[c])
		})
	} else {
		cls.push(classes.simple)
	}

	return (
		<button
			type={type}
			className={cls.join(' ')}
			onClick={onClick}
			style={style}
			disabled={disabled}
		>
			{label}
		</button>
	)
}

export default Button