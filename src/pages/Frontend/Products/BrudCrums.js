import React from 'react'

export default function BrudCrums(props) {
  const {product} = props
  return (
    <p>
      HOME - SHOPE - {product.category} - {product.name}
    </p>
  )
}
