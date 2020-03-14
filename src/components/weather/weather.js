import React, { useEffect } from 'react'
import './weather.css'
import c from '../../consts/consts'

import { getCityIdByCoords } from '../../store/cities';
import { fillDate } from '../../utils/enum'

export default function Weather (props) {
  
  useEffect(() => {
    const location = navigator.geolocation;
    location.getCurrentPosition((position)=>{
      const id = getCityIdByCoords(position.coords.latitude, position.coords.longitude);
      if (id !== -1) {
        props.setDefaultId(id)
        props.fetchWeatherById(id, props.apiKey, c.SET_CUR_CITY)
        props.fetchForecastById(id, props.apiKey)
      }
    });
  }, [])

  function saveCity() {
    props.saveCity()
    const storage = [...props.saveCities, props.curCity];
    localStorage.setItem('saveCities', JSON.stringify(storage));
  }

  if (props.curCity) { 
    const now = new Date();

    return (
    <div className="weather">
      <div className="column">
        <span className="text--small text--center mb--small">
          {`${fillDate(now.getDate())}:${fillDate(now.getMonth())}:${now.getFullYear()}`}
        </span>
        <h2 className="text--center mb--small">{props.curCity.main.temp}<span className="celsius">C</span></h2>
        <span className="text text--center text--light">
          {`${props.curCity.name}, ${props.curCity.sys.country}`}
        </span>
        { !props.isForecast &&
          <span className="text text--center text--semibold mt--less-medium">
            {`${props.curCity.weather[0].description}, ветер - ${props.curCity.wind.speed} м/сек`}
          </span>
        }
      </div>
      <button type="button" 
              className="btn btn--check-city"
              onClick={saveCity}></button>
    </div>
    ) 
  }
  
  return null
}