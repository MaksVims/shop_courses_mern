import React from 'react'
import OrderItem from "../OrderItem/OrderItem";

const OrdersList = ({orders}) => {
  return (
    <>
      {orders.map(order => (
        <OrderItem
          key={order._id}
          order={order}
        />
      ))}
    </>
  )
}

export default OrdersList