import React from 'react'
import {Link} from 'react-router-dom'

const Mug = ({mug}) => (
  <div className="list-mug">
    <Link to={{pathname: `/mugs/${mug.id}`, state: {...mug}}}>
      <h4>{mug.title}</h4>
      <img src={mug.imgUrl} width="200" height="200" />
    </Link>
    <h5>Price: ${mug.price / 100}</h5>
  </div>
)

export default Mug
