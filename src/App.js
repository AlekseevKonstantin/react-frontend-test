import React, { useEffect } from "react";
import {Route, Switch, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { CSSTransition, TransitionGroup } from  'react-transition-group';

import "./index.css";
import Preloader from './components/preloader/preloader';
import NavbarPage from './components/navbar/navbarContainer'

import Weather from './components/weather/weatherContainer'
import Home from './views/home/homeContainer'
import Forecast from './views/forecast/dailyForecast'
import Week from './views/week/week'
import Detailed from './views/detailed/detailed'

import { setIsForecast, setSaveCity } from './actions/actions'


function App (props) {

  const location = useLocation();
 
  useEffect(()=>{

    if (location.pathname !== '/') {
      props.setIsForecast(true)
    }

    let storage =  localStorage.saveCities;
    if(storage !== null && storage !== undefined) {
      storage = JSON.parse(storage)
      props.setSaveCity(storage)
    }
  }, [])

  return (
    <div className="page">
      { props.isWaiting &&
        <Preloader width={80} height={80} strokeColor="#1976d2" strokeWidth={2}/>
      }
      <NavbarPage />
      <Weather />

      <Route render={({location}) => (
        <TransitionGroup className="relative">
          <CSSTransition 
                        key={location.pathname}
                        timeout={{ enter: 400, exit: 200 }}
                        classNames={'fade'}> 
            <Switch location={location}> 
              <Route exact 
                     path='/' 
                     component={Home} /> 
              <Route path='/today' 
                     component={()=> <Forecast forecast={props.todayForecast} 
                                               isTime='today'/>} /> 
              <Route path='/tomorrow'
                     component={()=> <Forecast forecast={props.tomorrowForecast} 
                                               isTime='tomorrow'/>}/> 
              <Route path="/week"  
                     component={() => <Week forecast={props.weekForecast}/>} />
              
              <Route path="/city/:name"  
                     component={() => <Detailed today={props.todayForecast}
                                                tomorrow={props.tomorrowForecast}  
                                                week={props.weekForecast}/>} />
            </Switch>

          </CSSTransition>
        </TransitionGroup> 
      )} />
    </div>
  );
 
}

const matStateToProps = (state) => {
  return {
    isWaiting: state.isWaiting,
    todayForecast: state.todayForecast,
    tomorrowForecast: state.tomorrowForecast,
    weekForecast: state.weekForecast,
    curCity: state.curCity
  };
}

const mapDispathToProps = (dispatch) => {
  return {
    setIsForecast: (IsForecast) => dispatch(setIsForecast(IsForecast)),
    setSaveCity: (cities) => dispatch(setSaveCity(cities))
  }  
}

export default connect(matStateToProps, mapDispathToProps)(App);


