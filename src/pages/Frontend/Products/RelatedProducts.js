import React from 'react'
import newCollction from '../../../Assets/NewCollection'
import Items from '../Items/Items'
export default function RelatedProducts() {
  return (
    <div className='related'>
        <h3>Related Products</h3>
        <div className="newCollection">
            {
                newCollction.map((item,i) => {
                    return <Items key={i} id={item.id} newPrice={item.newPrice} oldPrice={item.oldPrice} image={item.image}/>
                })
            }
        </div>
    </div>
  )
}
