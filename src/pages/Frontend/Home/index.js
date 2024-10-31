import React from 'react'
import Hero from './Hero'
import Popular from './Popular'
import Sold from './Sold'
import Blog from './Blog'

export default function index({mode, setMode}) {
  return (
    <>
    <Hero mode={mode} setMode={setMode}/>
    <Popular />
    <Sold />
    <Blog />
    </>
  )
}
