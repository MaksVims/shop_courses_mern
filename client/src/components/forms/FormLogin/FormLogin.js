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
import {getValueFields} from "../../../other/utils";
import {useMessageError} from "../../../hooks/useMessageErrors";


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
	useMessageError(error, message, clearError);

	const loginHandler = useCallback(async () => {
		try {
			const {email, password} = getValueFields(formControls)
			const data = await request('/api/auth/login', 'POST', {email, password})
			login(data.token, data.userId);
			history.push('/')
			message(MESSAGES.USER_SIGN_IN, 'success');
		} catch (e) {
		}
	}, [request, formControls, history, login, message])

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