import React from 'react'
import Button from "../../UI/Button/Button";
import {formatDate} from "../../../other/utils";
import FormUserInfo from "../../forms/FormUserInfo/FormUserInfo";
import defaultAvatar from '../../../image/default.jpg'
import './ProfileContent.scss'

const ProfileContent = (props) => {
  const {user, openModal, handlers} = props
  return (
    <div className="row no-gutters profile-content">
      <div className="col-md-4">
        <img src={user.avatarUrl || defaultAvatar} className="card-img"
             alt="default"/>
        <Button
          className={'primary inversion'}
          label={'Сменить аватар'}
          onClick={openModal}
        />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">Email: {user.email}</h5>
          <FormUserInfo
            user={user}
            onClick={handlers.updateUserInfo}
          />
          <p className="card-text">
            <small className="text-muted">
              Зарегистирован: {formatDate(new Date(user.dateRegister))}
            </small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileContent