import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/useHttp";
import Loader from "../../components/Loader/Loader";
import {AuthContext} from "../../context/auth/AuthContext";
import CartView from "../../components/CartView/CartView";
import {useMessage} from "../../hooks/useMessage";
import {useMessageError} from "../../hooks/useMessageErrors";
import Button from "../../components/UI/Button/Button";
import {convertToCurrency} from "../../other/utils";
import './Cart.scss'
import {MESSAGES} from "../../constants";

const Cart = () => {
	const [cart, setCart] = useState(null)
	const {request, loading, error, clearError} = useHttp()
	const {token} = useContext(AuthContext)
	const message = useMessage()
	useMessageError(error, message, clearError)

	const fetchCart = useCallback(async (reload = true) => {
		try {
			const data = await request('/api/cart/', 'POST', null, {
				authorization: `Bearer ${token}`
			}, reload)
			setCart(data);
		} catch (e) {
		}
	}, [request, token])

	const removeToCart = useCallback(async id => {
		try {
			const data = await request('/api/cart/remove', 'POST', {id}, {
				authorization: `Bearer ${token}`
			}, false)
			if (data) {
				await fetchCart(false)
				message(MESSAGES.COURSE_DELETE_TO_CART)
			}
		} catch (e) {
		}
	}, [request, token, message, MESSAGES])



	useEffect(() => {
		fetchCart()
	}, [fetchCart])

	if (loading || !cart) return <Loader/>

	return (
		<section className="page col-lg-8 col-sm-10 m-auto cart">
			<h1>Корзина</h1>
			{
				!cart.courses.length ? <h5>Корзина пуста</h5>
					: <>
						<CartView cart={cart} onClick={removeToCart}/>
						<div className="cart-footer">
							<span className="badge badge-info">Итого: {convertToCurrency(cart.totalPrice)}</span>
							<Button
								className="primary"
								label={'Офомить заказ'}
							/>
						</div>
					</>
			}
		</section>
	)
}

export default Cart