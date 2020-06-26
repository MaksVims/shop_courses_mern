import React from 'react'
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import {useModal} from "../../../hooks/useModal";
import Modal from "@material-ui/core/Modal";
import Slide from "@material-ui/core/Slide";
import FormAvatar from "../../forms/FormAvatar/FormAvatar";
import ProfileContent from "../ProfileContent/ProfileContent";

const ProfileView = (props) => {
	const {profile, handlers} = props
	const {user, info} = profile
	const {open, closeModal, openModal} = useModal()

	return (
		<div className="card mb-3 mt-4 pt-2 pl-2 pr-2">
			<ProfileContent
				handlers={handlers}
				user={user}
				openModal={openModal}
			/>
			<ProfileInfo data={info}/>
			<Modal
				className={'Overlay'}
				open={open}
				closeAfterTransition
				onClose={closeModal}
			>
				<Slide in={open} timeout={300} direction={'up'} mountOnEnter unmountOnExit>
					<div className={'Modal'}>
						<h2>Загрузите изображение</h2>
						<FormAvatar onClick={handlers.updateAvatar}/>
					</div>
				</Slide>
			</Modal>
		</div>
	)
}

export default ProfileView