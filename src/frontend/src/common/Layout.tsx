import React from 'react'
import Navbar from '../components/Navbar'

const Layout: React.FC<{children: React.ReactNode | React.ReactNode[]}> = ({children}) => {
  return (
    <>
      <div className="position-fixed w-100 z-3">
        <Navbar />
      </div>
      <div className='main-content'>
        {children}
      </div>
    </>
  )
}

export default Layout