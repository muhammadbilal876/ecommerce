import React, { useContext } from 'react'
import BrudCrums from './BrudCrums'
import { useParams } from 'react-router-dom'
import ProductDisplay from './ProductDisplay'
import {AuthContext} from '../../../context/Context'
import Description from './Description'
import RelatedProducts from './RelatedProducts'

export default function Index() {

  const {allProduct} = useContext(AuthContext) 
  const {productId} = useParams()
  
  const product = allProduct.find((e) => e.id ===Number(productId))
  
  return (
    <div className='product-pro'>
    <BrudCrums product={product}/> 
    <ProductDisplay product={product}/>
    <Description />
    <RelatedProducts />
    </div>
  )
}
