import React, { useState } from 'react'
import data from '../../../Assets/data'
import Items from '../Items/Items'


export default function Popular() {

    const [popularLink, setPopularLink] = useState('bestSellers')
    
  return (
    <div className='popular'>
        <div className="popular-link">
            <h1 onClick={() => setPopularLink("bestSellers")} className={popularLink==='bestSellers'?'act-popular':''}>Best Sellers</h1>
            <h1 onClick={() => setPopularLink("newArrivals")} className={popularLink==='newArrivals'?'act-popular':''}>New Arrivals</h1>
            <h1 onClick={() => setPopularLink('hotSales')} className={popularLink==='hotSales'?'act-popular':''}>Hot Sales</h1>
        </div>
        <div className="product-popular">
            {data.map((item,i) => {
                if(item.category === popularLink){
                    return <Items id={item.id} key={i} name={item.name} newPrice={item.newPrice} oldPrice={item.oldPrice} image={item.image}/>
                }
                return null
            })}
        </div>
    </div>
  )
}
