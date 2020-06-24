import React from 'react'

const Checkout = ({user}) => (
  <div id="checkout">
    <h1>
      Thank you for placing an order{user.id ? `, ${user.firstName}` : ''}!
    </h1>
  </div>
)

export default Checkout
