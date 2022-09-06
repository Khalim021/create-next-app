import React from 'react'
import FeatPosts from '../sections/FeatPosts';
import { Header } from './zindex';

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <FeatPosts />
      {children}
    </>
  )
}

export default Layout