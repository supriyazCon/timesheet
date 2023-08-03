import React from 'react'
import { Routes, Route } from 'react-router-dom'
import T1index from './T1index'
import Login from '../Login/Login'
import { ROUTES } from '../../Routes/Paths'

function MainIndex() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path="*" element={<T1index />} />
    </Routes>
  )
}

export default MainIndex
