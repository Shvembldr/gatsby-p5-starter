import React from 'react'
import styles from './layout.module.css'

const Layout = ({ children }) => (
  <div className={styles.mainContainer}>{children}</div>
)

export default Layout
