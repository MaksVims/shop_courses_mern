import React, {useCallback, useMemo, useReducer} from 'react'
import {AlertContext} from "./alertContext";

function alertReducer(state, action) {
	switch (action.type) {
		case 'SHOW':
			return {...action.payload}
		case 'HIDE':
			return null
		default:
			return state
	}
}


const StateAlert = ({children}) => {
	const [state, dispatch] = useReducer(alertReducer, null);

	const hide = useCallback(() => dispatch({type: 'HIDE'}), []);
	const show = useCallback(({text, theme = 'error', ms = 4000}) => {
		dispatch({type: 'SHOW', payload: {text, theme}})
		setTimeout(hide, ms)
	}, [])

	const valueAlertContext = useMemo(() => ({show, hide, alert: state}), [state, show, state])

	return (
		<AlertContext.Provider value={valueAlertContext}>
			{children}
		</AlertContext.Provider>
	)
}

export default StateAlert