import React, { Fragment } from 'react'
import NavbarWombat from '../Navbar'

export default function Layout({children}) {
  return (
    <Fragment>
      <NavbarWombat/>
      {children}
    </Fragment>
  )
}
