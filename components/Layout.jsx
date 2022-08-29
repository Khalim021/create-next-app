import React from 'react'
import { Header } from './zindex';

const Layout = ({children}) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout