import {useCallback, useContext} from "react";
import {MESSAGES} from "../constants";
import {AuthContext} from "../context/auth/AuthContext";
import {useMessage} from "./useMessage";
import {useHttp} from "./useHttp";
import {useMessageError} from "./useMessageErrors";


export function useAddToCart(url) {
	const {request, error, clearError} = useHttp()
	const {token} = useContext(AuthContext)
	const message = useMessage()
	useMessageError(error, message, clearError)

	const addToCart = useCallback(async id => {
		try {
			const data = await request(url, 'POST', {id}, {
				authorization: `Bearer ${token}`
			}, false)
			if (data) {
				message(MESSAGES.COURSE_ADD_TO_CART, 'success')
			}
		} catch (e) {}
	}, [message, request, token, url])

	return addToCart
}