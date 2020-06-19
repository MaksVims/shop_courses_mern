import React from 'react'
import Form from "../../UI/Form/Form";
import {createControl, createInputs} from "../../../other/validation";
import {useFormValidation} from "../../../hooks/useFormValidation";
import Button from "../../UI/Button/Button";

function createFormControls() {
  return {
    email: createControl({type:'email',label: 'Email', errorMessage: 'Введите корректный email'},
      {required: true, email: true}),
    password: createControl({type: 'password', label: 'Пароль', errorMessage: 'Пустое поле'}, {required: true})
  }
}

const FormLogin = () => {
  const {formControls, isValidForm, changeHandler} = useFormValidation(createFormControls)

  return (
    <Form>
      {createInputs(formControls, changeHandler)}
      <Button
        label='Войти'
        disabled={!isValidForm}
      />
    </Form>
  )
}

export default FormLogin