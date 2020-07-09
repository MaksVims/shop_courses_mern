import React, {useState} from 'react'
import Button from "../../UI/Button/Button";
import './FormAvatar.scss'

const FormAvatar = ({onClick}) => {
	const [avatar, setAvatar] = useState(null)

	const changeHandler = (e) => {
		if (e.target.files) {
			setAvatar(e.target.files[0])
		}
	}

	return (
		<div className={"form_avatar"}>
			<input
				id="avatar"
				type='file'
				name={"avatar"}
				onChange={changeHandler}
			/>
			<label htmlFor="avatar" className="custom-file-upload">
				Выбрать файл
			</label>
			<Button
				type={'submit'}
				label={'Обновить'}
				onClick={() => onClick(avatar)}
			/>
		</div>
	)
}

export default FormAvatar