import React, {useCallback} from 'react'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";
import {getValueFields} from "../../../other/utils";

const styledForm = {
	border: '1px solid transparent',
	padding: '0px',
	boxShadow: 'none',
	marginBottom: '20px'
}

const createFormControls = (name, bio) => {
	return {
		name: createControl({label: 'Имя', errorMessage: 'Введите имя', touched: true, valid: true, value: name},
			{required: true}),
		bio: createControl({label: 'Биография', value: bio, tag:'textarea'})
	}
}

const FormUserInfo = ({user, onClick}) => {
	const {formControls, changeHandler, resetFormControls} = useFormValidation(
		() => createFormControls(user.name, user.bio))

	const clickHandler = useCallback(() => {
		onClick(getValueFields(formControls))
		resetFormControls()
	}, [formControls, resetFormControls])

	return (
		<Form style={styledForm}>
			{createInputs(formControls, changeHandler)}
			<div style={{display:'flex', justifyContent: 'flex-end'}}>
				<Button
					label={'Сохранить'}
					onClick={clickHandler}
				/>
			</div>
		</Form>
	)
}

export default FormUserInfo