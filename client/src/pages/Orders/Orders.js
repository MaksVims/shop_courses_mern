import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/useHttp";
import Loader from "../../components/Loader/Loader";
import OrdersList from "../../components/Orders/OrdersList/OrdersList";
import {AuthContext} from "../../context/auth/AuthContext";

const Orders = () => {
  const [orders, setOrders] = useState(null)
  const {request, loading} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchOrders = useCallback( async () => {
    try {
      const data = await request('/api/order/all', 'POST', null, {
        authorization: `Bearer ${token}`
      })
      if (data) {
        setOrders(data)
      }
    } catch (e) {
    }
  }, [request, token])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  if (loading || !orders) return  <Loader />

  return (
    <section className="page col-sm-10 col-lg-6 m-auto">
      <h1>Ваши заказы</h1>
      {
        !orders.length ? <h5>Вы не сделали еще ни одного заказа</h5>
          : <OrdersList orders={orders}/>
      }
    </section>
  )
}

export default Orders