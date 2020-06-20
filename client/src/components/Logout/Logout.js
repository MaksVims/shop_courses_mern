import React, {useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {AuthContext} from "../../context/auth/AuthContext";
import {AlertContext} from "../../context/alert/alertContext";
import {MESSAGES} from "../../constants";
import {useMessage} from "../../hooks/useMessage";

const Logout = () => {
	const {logout} = useContext(AuthContext)
	const message = useMessage(AlertContext)

	useEffect(() => {
		message(MESSAGES.USER_OUT_SESSION)
	}, [])

	logout()

  return (
    <>
    	<Redirect to={'/auth#login'}/>
    	<h1>Hello</h1>
    </>
  )
}

export default Logout