import React from 'react'
import { Link } from 'react-router-dom'

export default function Items({name, newPrice, oldPrice, image, id}) {
  return (
    <div className='item'>
        <img src={image} alt="" />
        <h2>{name}</h2>
        <div>
            <span>
                <h4>${newPrice}</h4>
                <h4 className='old'>${oldPrice}</h4>
            </span>
            <Link to={`/product/${id}`}><button onClick={window.scrollTo(0,0)}>Add TO Cart</button></Link>
        </div>
    </div>
  )
}
