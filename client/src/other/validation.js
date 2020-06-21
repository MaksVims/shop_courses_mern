import Input from "../components/UI/Input/Input";
import React from 'react'
import isEmail from 'validator/es/lib/isEmail'

export function createControl(config, validation = null) {
	return {
		value: '',
		touched: false,
		valid: !validation,
		...config,
		validation
	}
}

export function createInputs(formControls, onChange) {
	return Object.keys(formControls).map(controlName => {
		const control = formControls[controlName];
		return (
			<Input
				key={controlName}
				{...control}
				shouldValidate = {!!control.validation}
				onChange={e => onChange(e.target.value, controlName)}
			/>
		)
	})
}

export function checkValidControl(value, validation = null) {
	if (!validation) return true;
	let valid = true;

	if (validation.required) {
		valid = value.trim() !== '' && valid;
	}

	if (validation.email) {
		valid = isEmail(value) && valid
	}

	if (validation.minLength) {
		valid = value.trim().length >= validation.minLength && valid
	}

	return valid;
}

export function checkValidForm(formControls, isValid = true) {
	return Object.keys(formControls).every(controlName => {
		return formControls[controlName].valid
	}) && isValid
}

