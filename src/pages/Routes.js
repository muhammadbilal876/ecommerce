import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Authentication from './authentication'
import Frontend from './Frontend'
import NoPage from './Nopage'

export default function Index() {

    const [mode, setMode] = useState('light')
  return (
      <div className={mode==='light'?'containe':'dark containe'}>
        <BrowserRouter>
        <Routes>
            <Route path='/*' element={<Frontend  mode={mode} setMode={setMode}/>}/>
            <Route path='/authentication/*' element={<Authentication />} />
           <Route path='*' element={<NoPage/>}/> 
        </Routes>
        </BrowserRouter>           
    </div>
  )
}
