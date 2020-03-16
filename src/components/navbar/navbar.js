import React from "react";
import { Link, useLocation }  from "react-router-dom"

import './navbar.css'

import AutoComplete from '../autoComplete/autocomleteContainer';

import { getArrayOfCities } from '../../store/cities'

export default function NavbarPage (props) {

  const location = useLocation();

  const mobileMenuRef = React.createRef(),
        burgerRef = React.createRef();


  function endAction() {
    let btn = burgerRef.current,
        mobileMenu = mobileMenuRef.current,
        root = getParent(mobileMenu, 'root');

    if (location.pathname !== '/') {
      props.setIsForecast(true)
    }

    btn.classList.remove('active')
    mobileMenu.classList.remove('active')
    root.classList.remove('no-scroll')
  }

  function isForecastTrue() {
    props.setIsForecast(true)
  }

  function isForecastFalse() {
    props.setIsForecast(false)
  }

  function getParent(el, parentClassName) {
    if (el === null || el === undefined) {
      return null;
    }

    const parent = el.parentNode;

    if (parent.parentNode === null || parent.parentNode === undefined) {
      return null;
    }

    if (parent.classList.contains(parentClassName)) {
      return parent;
    }
    return getParent(parent, parentClassName);
  }

  function mobileOpenHandler (e) {
    let btn = burgerRef.current,
        mobileMenu = mobileMenuRef.current,
        root = getParent(mobileMenu, 'root');

    btn.classList.toggle('active')
    mobileMenu.classList.toggle('active')
    root.classList.toggle('no-scroll')
    
  }

  const city = getArrayOfCities()

  return (
    <nav className="navbar">
      <div className="row hidden-sm">
        <Link to="/" className="navbar__item" onClick={isForecastFalse}>Home</Link>
        <Link to="/today" className="navbar__item" onClick={isForecastTrue}>Today</Link>
        <Link to="/tomorrow" className="navbar__item" onClick={isForecastTrue}>Tomorrow</Link>
        <Link to="/week" className="navbar__item" onClick={isForecastTrue}>Week</Link>
      </div>

      <button type="button" className="btn btn-burger hidden visible-sm" onClick={mobileOpenHandler} ref={burgerRef}>
        <span className="btn-burger-icon"></span>
      </button>

      <div className="mobile-menu" ref={mobileMenuRef}>
        <Link to="/" className="mobile-menu__item" onClick={endAction}>Home</Link>
        <Link to="/today" className="mobile-menu__item" onClick={endAction}>Today</Link>
        <Link to="/tomorrow" className="mobile-menu__item" onClick={endAction}>Tomorrow</Link>
        <Link to="/week" className="mobile-menu__item" onClick={endAction}>Week</Link>
      </div>

      <form className="form">
        <AutoComplete list={city} placeholder='Выберите город ...'/>
      </form>
    </nav>
  )
}

