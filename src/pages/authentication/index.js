import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'
export default function index() {
  return (
    <Routes>
    <Route path='/'>
    <Route path='login' element={<Login />}/>
    <Route path='register' element={<Register />}/>
    <Route path='forget-password' element={<ForgotPassword />}/>
    </Route>
</Routes>
  )
}
