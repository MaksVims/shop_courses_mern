import {useEffect} from "react";

export function useMessageError(error, message, clearError) {
	useEffect(() => {
		message(error);
		clearError()
	}, [error, message, clearError])
}