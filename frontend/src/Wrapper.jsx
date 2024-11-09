import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'

const Wrapper = ({ children }) => {
  return (
    <div>
    <NavBar />
    <div > 
        <Outlet /> 
      </div>
  </div>
  )
}

export default Wrapper
