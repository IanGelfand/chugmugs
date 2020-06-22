import React from 'react'
import history from '../history'

const Mug = ({id, title, price, imgUrl}) => (
  <div className="list-mug">
    <h4 onClick={() => history.push(`/mugs/${id}`)}>{title}</h4>
    <img src={imgUrl} onClick={() => history.push(`/mugs/${id}`)} />
    <h5>Price: ${price / 100}</h5>
  </div>
)

export default Mug
