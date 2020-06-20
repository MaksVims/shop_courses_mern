import React, {useCallback} from 'react'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";
import {useAuth} from "../../../hooks/useAuth";
import {useHttp} from "../../../hooks/useHttp";
import {getValueFields} from "../../../other/utils";
import {useMessage} from "../../../hooks/useMessage";
import {useMessageError} from "../../../hooks/useMessageErrors";

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
	const message = useMessage();
	const {token} = useAuth()
	const {request, error, clearError} = useHttp()
	useMessageError(error, message, clearError);

	const createHandler = useCallback(async () => {
		const {title, price, imgUrl, description} = getValueFields(formControls)
		try {
			const data = await request('/api/create', 'POST', {title, price, imgUrl, description})
			if (data) {

			}
		} catch (e) {}
	}, [])

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
