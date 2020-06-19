import React from 'react'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";

function createFormControls() {
	return {
		name: createControl({label: 'Имя', errorMessage: 'Заполните поле'}, {required: true}),
		email: createControl({type: 'email', label: 'Email', errorMessage: 'Введите корректный email'},
			{required: true, email: true}),
		password: createControl({type: 'password', label: 'Пароль', errorMessage: 'Минимальная длина пароля 6 символов'},
			{required: true, minLength: 6}),
		repeat: createControl({type: 'password', label: 'Повтори пароль', errorMessage: 'Пустое поле'},
			{required: true}),
	}
}

const FormRegister = () => {
	const {formControls, isValidForm, changeHandler} = useFormValidation(createFormControls)

	return (
		<Form>
			{createInputs(formControls, changeHandler)}
			<Button
				label='Зарегистрироваться'
				disabled={!isValidForm}
			/>
		</Form>
	)
}

export default FormRegister