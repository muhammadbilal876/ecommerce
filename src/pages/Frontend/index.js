import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Home'
import Products from './Products/index'
import Category from './Category/Category'
import Contact from './Contact'
import CartItems from './CartItems'
import PrivateRoutes from '../../important/PrivateRoutes'
export default function index({ mode, setMode }) {

  
  return (
    <>
    <Header mode={mode} setMode={setMode}/>
    <Routes>
        <Route path='/'>
        <Route index element={<Home mode={mode} setMode={setMode}/>}/>
        <Route path='/men' element={<Category category='men'/>}/>
        <Route path='/women' element={<Category category='women'/>}/>
        <Route path='/product/:productId' element={<Products />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<PrivateRoutes Components={CartItems}/>} />
        </Route>
    </Routes>
    <Footer mode={mode}/>
    </>
  )
}



