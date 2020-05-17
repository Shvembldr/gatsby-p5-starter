import React from 'react'
import { Link } from 'gatsby'
import styles from './index.module.css'

const IndexPage = () => (
  <div className={styles.container}>
    <Link to="/start">Start</Link>
    <Link to="/frwrd">FRWRD</Link>
    <Link to="/reciprocality">Reciprocality</Link>
    {/* PLOP_INJECT_LINK */}
  </div>
)

export default IndexPage
