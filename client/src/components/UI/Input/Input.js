import React from 'react'
import classes from './Input.module.scss'

function isInvalidInput({valid, touched, shouldValidate}) {
	return touched && shouldValidate && !valid;
}

const Input = props => {
	const {
		type = 'text', value = '', onChange = f => f,
		label = '', errorMessage = 'Что то пошло не так', placeholder = ''
	} = props
	const id = Date.now() + label
	const isInvalid = isInvalidInput(props);
	const cls = [classes.Input]
	if (isInvalid) {
		cls.push(classes.error)
	}

	return (
		<div className={cls.join(' ') + ' form-group'}>
			<label htmlFor={id}>{label}</label>
			<input
				type={type}
				id={id}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				className={'form-control'}
			/>
			{isInvalid ? <small>{errorMessage}</small> : null}
		</div>
	)
}

export default Input