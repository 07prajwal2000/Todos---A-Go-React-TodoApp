import React from 'react'
import Navbar from '../components/Navbar'

const Layout: React.FC<{children: React.ReactNode | React.ReactNode[]}> = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout