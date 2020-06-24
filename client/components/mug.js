import React from 'react'
import {Link} from 'react-router-dom'

const Mug = ({mug}) => (
  <div className="list-mug">
    <Link to={{pathname: `/mugs/${mug.id}`, state: {...mug}}}>
      <h4 className="allMugTitle">{mug.title}</h4>
      <img src={mug.imgUrl} width="300rem" height="300rem" />
    </Link>
    <h5 className="mugPrice">${mug.price / 100}</h5>
  </div>
)

export default Mug
