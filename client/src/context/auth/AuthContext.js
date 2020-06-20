import {createContext} from 'react'

const noop = f => f

export const AuthContext = createContext({
	isAuth: false,
	ready: false,
	token: null,
	userId: null,
	login: noop,
	logout: noop
})