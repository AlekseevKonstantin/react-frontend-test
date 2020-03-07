import React from "react";
import {Route, Switch, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

import { CSSTransition, TransitionGroup } from  'react-transition-group';

import "./index.css";
import NavbarPage from './components/navbar/navbar'

import Home from './views/Home'
import Tomorrow from './views/Tomorrow'
import Week from './views/Week'

function App ({location}) {
  
  return (
    <div className="page">
      <NavbarPage />
      
      {/* <TransitionGroup>
        <CSSTransition key={location.key}
                      timeout={{ enter: 300, exit: 300 }}
                      classNames={'page-transform'}> */}
          <Switch location={location}> 
            <Route exact path='/' component={Home} /> 
            <Route path='/tomorrow' component={Tomorrow} /> 
            <Route path="/week" component={Week} />
          </Switch>
       {/*  </CSSTransition>
      </TransitionGroup> */}
      
    </div>
  );
 
}

export default withRouter(App);
