import React, {useState} from 'react'
import Button from "../../UI/Button/Button";
import './FormAvatar.scss'

const FormAvatar = ({onClick}) => {
	const [avatar, setAvatar] = useState('')

	return (
		<div className={"form_avatar"}>
			<input
				id="avatar"
				type='file'
				value={avatar}
				onChange={event => setAvatar(event.target.value)}
			/>
			<label htmlFor="avatar" className="custom-file-upload">
				Выбрать файл
			</label>
			<Button
				type={'submit'}
				label={'Обновить'}
				disabled={!avatar}
				onClick={() => onClick(avatar)}
			/>
		</div>
	)
}

export default FormAvatar