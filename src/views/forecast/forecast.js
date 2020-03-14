import React from 'react'

export default function Forecast (props) {

  function forecastToProps() {
    return props.forecast.list.map((item, index) => {
      let datetime = new Date(item.dt_txt)
      return (
        <div className="row mt--small mb--small" key={index}>
          <div className="w10p wfix-60">
            <span className="text--small">{`${datetime.getHours().toFixed(2)}`}</span>
          </div>
          <div className="row w90p">
            <span className="text--small">
              {item.main.temp} 
              <span className="celsius--small">C</span>, 
              {`${item.weather[0].description}, Ветер - ${item.wind.speed} м/сек`} </span>
          </div>
        </div>
      )
    })
  }

  return props.forecast ? forecastToProps() : null 
}