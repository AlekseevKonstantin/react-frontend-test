import React from "react";
import { Link }  from "react-router-dom"

import styles from './navbar.module.css'

import AutoComplete from '../AutoComplete/autocomlete';

export default function NavbarPage (props) {

  return (
    <nav className={styles.navbar}>
      <div className="row">
        <Link to="/" className={styles.navbar__item}>Today</Link>
        <Link to="/tomorrow" className={styles.navbar__item}>Tomorrow</Link>
        <Link to="/week" className={styles.navbar__item}>Week</Link>
      </div>

      <form className="form">
        <AutoComplete list={['Moscow', 'St Peterburg']}/>
      </form>
    </nav>
  )
}

