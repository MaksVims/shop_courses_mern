import React from 'react'
import classes from './Form.module.scss'

const Form = ({children}) => {
  const submitHandler = e => e.preventDefault()
  return (
    <form
      className={classes.Form}
      onSubmit={submitHandler}>
      {children}
    </form>
  )
}

export default Form