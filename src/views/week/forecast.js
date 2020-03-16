import React from 'react'

import { fillDate } from '../../utils/enum'

export default function WeekForecast (props) {
  function forecastToProps() {
    return props.forecast.list.map((item, index) => {
      const dt = new Date(item.dt_txt); 
      return (
        <div className="col w20p w33p-md w50p-sm w100p-xs mb--less-medium" key={index}>
          <div className="card big">
            <span className="text--small mb--medium">{`${fillDate(dt.getDate())}:${fillDate(dt.getMonth())}:${dt.getFullYear()}`}</span>
            <div className="w100p">
              <h5 className="card__title text--center"> {item.main.temp}<span className="celsius">C</span></h5>
              <span className="text--small text--center">{`${item.weather[0].description}, ветер ${item.wind.speed} м/сек`}</span>
              <span className="card__caption text--center">{props.forecast.city.name}</span>
            </div>
          </div>
        </div>
      )
    })
  }

  return props.forecast ? forecastToProps() : null
}