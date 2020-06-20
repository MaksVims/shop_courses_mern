import React, {useCallback} from 'react'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";
import {useHttp} from "../../../hooks/useHttp";

function createFormControls() {
	return {
		email: createControl({type: 'email', label: 'Email', errorMessage: 'Введите корректный email'},
			{required: true, email: true}),
		password: createControl({type: 'password', label: 'Пароль', errorMessage: 'Пустое поле'}, {required: true})
	}
}

const FormLogin = () => {
	const {formControls, isValidForm, changeHandler} = useFormValidation(createFormControls)
	const {request, error} = useHttp()

	const loginHandler = useCallback(async () => {
		try {
			const {email, password} = formControls
			const data = await request('/api/auth/login', 'POST', {email: email.value, password: password.value})
			console.log(data)
			console.log(error)
		} catch (e) {}
	}, [request, formControls])

	return (
		<Form>
			{createInputs(formControls, changeHandler)}
			<Button
				label='Войти'
				disabled={!isValidForm}
				onClick={loginHandler}
			/>
		</Form>
	)
}

export default FormLogin