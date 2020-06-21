import React, {useCallback, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";
import {useAuth} from "../../../hooks/useAuth";
import {useHttp} from "../../../hooks/useHttp";
import {getValueFields} from "../../../other/utils";
import {useMessage} from "../../../hooks/useMessage";
import {useMessageError} from "../../../hooks/useMessageErrors";
import {MESSAGES} from "../../../constants";

function createFormControls() {
	return {
		title: createControl({label: 'Название', errorMessage: 'Укажите название курса'},
			{required: true}),
		price: createControl({type: 'number', label: 'Стоимость', errorMessage: 'Укажите цену'},
			{required: true}),
		imgUrl: createControl({label: 'Картинка'}),
		description: createControl({label: 'Описание', tag: 'textarea'})
	}
}

const FormCreate = () => {
	const {formControls, isValidForm, changeHandler} = useFormValidation(createFormControls)
	const history = useHistory();
	const message = useMessage();
	const {token} = useAuth()
	const {request, error, clearError} = useHttp()
	useMessageError(error, message, clearError);

	useEffect(() => {
		message(error);
	}, [error, message])

	const createHandler = useCallback(async () => {
		const {title, price, imgUrl, description} = getValueFields(formControls)
		try {
			const data = await request('/api/course/create', 'POST', {title, price, imgUrl, description}, {
				authorization: `Bearer ${token}`
			})
			if (data) {
				history.push('/courses')
				message(MESSAGES.CREATE_COURSE, 'success');
			}
		} catch (e) {}
	}, [request, formControls, token, history, message])

		return (
			<Form>
				{createInputs(formControls, changeHandler)}
				<Button
					label='Создать курс'
					className={'primary'}
					disabled={!isValidForm}
					onClick={createHandler}
				/>
			</Form>
		)
	}

export default FormCreate
