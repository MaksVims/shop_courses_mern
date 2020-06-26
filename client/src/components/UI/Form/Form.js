import React from 'react'
import classes from './Form.module.scss'

const Form = ({children, style={}}) => {
  const submitHandler = e => e.preventDefault()
  return (
    <form
      className={classes.Form}
      style={style}
      onSubmit={submitHandler}>
      {children}
    </form>
  )
}

export default Form