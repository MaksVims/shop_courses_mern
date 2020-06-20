import React, {useCallback, useEffect} from 'react'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";
import {useHttp} from "../../../hooks/useHttp";
import {useMessage} from "../../../hooks/useMessage";
import {MESSAGES} from "../../../constants";
import {getValueFields} from "../../../other/utils";
import {useMessageError} from "../../../hooks/useMessageErrors";

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

const FormRegister = ({onRegister}) => {
	const {formControls, isValidForm, changeHandler, resetFormControls} = useFormValidation(createFormControls)
	const {request, error, clearError} = useHttp()
	const message = useMessage()
	useMessageError(error, message, clearError);

	const registerHandler = useCallback(async () => {
		try {
			const {email, password, name, repeat} = getValueFields(formControls)
			const data = await request('/api/auth/register', 'POST', {email, password, name, repeat})
			if (data) {
				message(MESSAGES.USER_REGISTER, 'success')
				onRegister('login')
				resetFormControls()
			}
		} catch (e) {
		}
	}, [request, formControls, resetFormControls, onRegister, message])

	return (
		<Form>
			{createInputs(formControls, changeHandler)}
			<Button
				label='Зарегистрироваться'
				disabled={!isValidForm}
				onClick={registerHandler}
			/>
		</Form>
	)
}

export default FormRegister