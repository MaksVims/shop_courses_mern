import React, {useCallback, useContext, useEffect} from 'react'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";
import {useHttp} from "../../../hooks/useHttp";
import {useMessage} from "../../../hooks/useMessage";
import {useHistory} from 'react-router-dom'
import {MESSAGES} from "../../../constants";
import {AuthContext} from "../../../context/auth/AuthContext";


function createFormControls() {
	return {
		email: createControl({type: 'email', label: 'Email', errorMessage: 'Введите корректный email'},
			{required: true, email: true}),
		password: createControl({type: 'password', label: 'Пароль', errorMessage: 'Пустое поле'}, {required: true})
	}
}

const FormLogin = () => {
	const {formControls, isValidForm, changeHandler} = useFormValidation(createFormControls)
	const {request, error, clearError} = useHttp()
	const message = useMessage()
	const {login} = useContext(AuthContext)
	const history = useHistory();

	useEffect(() => {
		message(error)
		clearError()
	}, [error, message])

	const loginHandler = useCallback(async () => {
		try {
			const {email, password} = formControls
			const data = await request('/api/auth/login', 'POST', {email: email.value, password: password.value})
			login(data.token, data.userId);
			history.push('/')
			message(MESSAGES.USER_SIGN_IN, 'success');
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