import {useCallback, useContext} from "react";
import {AlertContext} from "../context/alert/alertContext";

export function useMessage() {
	const {show} = useContext(AlertContext)
	return useCallback((message, theme = 'error') => {
		if (message) {
			show({text: message, theme})
		}
	}, [show])
}