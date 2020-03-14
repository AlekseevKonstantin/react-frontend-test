import React from 'react'
import ForecastMap from './forecastMap'
import Forecast from './forecast'

import { months } from '../../utils/enum'

export default function Home (props) {

  function getIsTime() {
    switch(props.isTime) {
      case 'today': 
        return 'Погода сегодня'
      case 'tomorrow':
        return 'Погода завтра'
      default:
        return `Погода в ${props.forecast ? props.forecast.city.name: ''}`
    }
  }

  const now = new Date();

  return (
    <div className="change-container  container">
      <div className="row row--nm row--flex-wrap">
        <div className="col w40p w100p-sm mb--less-medium-sm">
          <h2 className="mb--small">{getIsTime()}</h2>
          <span className="text mb--medium">{`${months[now.getMonth().toString()]}, ${now.getDate()}`}</span>

          <div className="row">
            <div className="w10p wfix-60 border--bottom"><span className="text--small">Время</span></div>
            <div className="w40p border--bottom"><span className="text--small">Погода</span></div>
          </div>

          <Forecast forecast={props.forecast} />
            
        </div>
        <div className="col w60p w100p-sm">
          <div id="map">
            <ForecastMap 
                forecast={props.forecast}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key="
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }}/>}
            />    
          </div>
        </div>
      </div>
    </div>
  )  
}