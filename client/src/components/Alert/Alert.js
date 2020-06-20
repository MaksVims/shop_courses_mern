import React, {useContext} from 'react'
import classes from './Alert.module.scss'
import {AlertContext} from "../../context/alert/alertContext";

const Alert = () => {
  const {hide, alert} = useContext(AlertContext)
  const cls = [classes.Alert];
  if (alert) {
    cls.push(classes.open, classes[alert.theme])
  }

  return (
    <div className={cls.join(' ')}>
      <span>{alert && alert.text}</span>
      <i
        className='fa fa-times'
        onClick={hide}
      > </i>
    </div>
  )
}

export default Alert