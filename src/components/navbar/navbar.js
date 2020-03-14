import React from "react";
import { Link }  from "react-router-dom"

import './navbar.css'

import AutoComplete from '../autoComplete/autocomleteContainer';

import { getArrayOfCities } from '../../store/cities'

export default function NavbarPage (props) {

  function isForecastTrue() {
    props.setIsForecast(true)
  }

  function isForecastFalse() {
    props.setIsForecast(false)
  }

  const city = getArrayOfCities()

  return (
    <nav className="navbar">
      <div className="row">
        <Link to="/" className="navbar__item" onClick={isForecastFalse}>Home</Link>
        <Link to="/today" className="navbar__item" onClick={isForecastTrue}>Today</Link>
        <Link to="/tomorrow" className="navbar__item" onClick={isForecastTrue}>Tomorrow</Link>
        <Link to="/week" className="navbar__item" onClick={isForecastTrue}>Week</Link>
      </div>

      <form className="form">
        <AutoComplete list={city} placeholder='Выберите город ...'/>
      </form>
    </nav>
  )
}

