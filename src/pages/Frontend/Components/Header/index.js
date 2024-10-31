import React from 'react'
import Navbar from './Navbar'

export default function index({ mode, setMode }) {
  return (
    <>
    <Navbar mode={mode} setMode={setMode}/>
    </>
  )
}
