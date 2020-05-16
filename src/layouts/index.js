import React from 'react'

const Layout = ({ children }) => (
  <div
    style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
  >
    {children}
  </div>
)

export default Layout
