import React from 'react'
import { Link } from 'gatsby'

const IndexPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Link to="/start">Start</Link>
    <Link to="/frwrd">FRWRD</Link>
    <Link to="/reciprocality">Reciprocality</Link>
    {/* PLOP_INJECT_LINK */}
  </div>
)

export default IndexPage
