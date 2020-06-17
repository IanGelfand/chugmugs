import React from 'react'
import history from '../history'

const Mug = ({id, title, price, imageUrl}) => (
  <div className="list-mug">
    <h4 onClick={() => history.push(`/mugs/${id}`)}>{title}</h4>
    <img src={imageUrl} onClick={() => history.push(`/mugs/${id}`)} />
    <h5>Price: ${price}</h5>
  </div>
)

export default Mug
