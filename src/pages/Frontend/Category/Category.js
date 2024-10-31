import React, { useContext } from 'react'
import { AuthContext } from '../../../context/Context'
import Items from '../Items/Items'

export default function Category(props) {

    const {allProduct} = useContext(AuthContext)

  return (
    <div className='category'>
      <div className="info-category">
      <p className="link-category">Home - <b className='link-category-active'>{props.category}</b></p>
      <h1>{props.category} JEWELLERY | WATCHSHOP</h1>
      <p className='description'>
      Treat yourself or the lady in your life to a fabulous piece from
      our extensive women's jewellery collection. Our diverse range of
      earrings, bracelets, rings, necklaces, and charms spans the full
      fashion spectrum, from timeless classic pieces to contemporary, 
      cutting-edge models. With an impressive selection from some of
      the world's most iconic designers.
      </p>
      </div>
      <div className="category-products">
        <div className="product">  
          {
            allProduct.map((item,i) => {
              if(item.category === props.category){
              return <Items id={item.id} key={i} name={item.name} newPrice={item.newPrice} oldPrice={item.oldPrice} image={item.image}/>
           }else{
            return null
           } 
          })
          }
        </div>
      </div>
    </div>
  )
}


