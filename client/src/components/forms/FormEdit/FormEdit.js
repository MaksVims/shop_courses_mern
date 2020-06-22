import React, {useCallback, useContext, useEffect} from 'react'
import './FormEdit.scss'
import {useHistory} from 'react-router-dom'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";
import {useHttp} from "../../../hooks/useHttp";
import {getValueFields} from "../../../other/utils";
import {useMessage} from "../../../hooks/useMessage";
import {useMessageError} from "../../../hooks/useMessageErrors";
import {MESSAGES} from "../../../constants";
import {AuthContext} from "../../../context/auth/AuthContext";

function createFormControls({title = '', price = 0, imgUrl = '', description = ''}) {
	return {
		title: createControl({
				label: 'Название', errorMessage: 'Укажите название курса',
				value: title, touched: true, valid: true
			},
			{required: true}),
		price: createControl({
				type: 'number', label: 'Стоимость', errorMessage: 'Укажите цену',
				value: price, touched: true, valid: true
			},
			{required: true}),
		imgUrl: createControl({label: 'Картинка', value: imgUrl}),
		description: createControl({label: 'Описание', tag: 'textarea', value: description})
	}
}

const FormEdit = (props) => {
	const {_id: id} = props.course
	const containerFunction = () => createFormControls(props.course)
	const {formControls, isValidForm, changeHandler} = useFormValidation(containerFunction)
	const history = useHistory();
	const message = useMessage();
	const {token} = useContext(AuthContext)
	const {request, error, clearError} = useHttp()
	useMessageError(error, message, clearError);

	useEffect(() => {
		message(error);
	}, [error, message])

	const deleteHandler = useCallback(async () => {
		try {
			const data = await request('/api/course/delete', 'POST', {id}, {
				authorization: `Bearer ${token}`
			})
			if (data) {
				message(MESSAGES.DELETE_COURSE)
				history.push('/courses')
			}
		} catch (e) {
		}
	}, [history, message, request, MESSAGES, token, id])

	const editHandler = useCallback(async () => {
		const {title, price, imgUrl, description} = getValueFields(formControls);

		try {
			const data = await request(`/api/course/edit`, 'POST', {id, title, price, imgUrl, description}, {
				authorization: `Bearer ${token}`
			})
			if (data) {
				message(MESSAGES.EDIT_COURSE, 'success')
				history.push('/courses')
			}
		} catch (e) {
		}
	}, [request, history, message, MESSAGES, id, formControls, token])

	return (
		<Form>
			{createInputs(formControls, changeHandler)}
			<div className="form-edit-btn-panel">
				<Button
					label='Редактировать курс'
					className={'primary'}
					onClick={editHandler}
					disabled={!isValidForm}
				/>
				<Button
					label='Удалить курс'
					className={'danger inversion'}
					onClick={deleteHandler}
				/>
			</div>
		</Form>
	)
}

export default FormEdit
