import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const ForecastMap = withScriptjs(withGoogleMap( (props) => {

  const [showInfo, setShowInfo] = useState(false)

  function setCityHandler () {
    setShowInfo(true)
  }

  function closeClickHandler () {
    setShowInfo(false)
  }

  return (
     props.forecast ?
      <GoogleMap defaultZoom={8}
                 defaultCenter={{ lat: props.forecast.city.coord.lat, lng: props.forecast.city.coord.lon }}>
        <Marker position={{ lat: props.forecast.city.coord.lat, lng: props.forecast.city.coord.lon }} 
                onClick={setCityHandler}  
        />
        {showInfo && (
          <InfoWindow position={{ lat: props.forecast.city.coord.lat, lng: props.forecast.city.coord.lon }}
                      onCloseClick={closeClickHandler}>
            <div>            
              <h4>{props.forecast.city.name}</h4>
              <span className="text--small">{`температура: ${props.forecast.list[0].main.temp}`} <span className="celsius--small">C</span></span>
              <span className="text--small">{`ощущается как: ${props.forecast.list[0].main.feels_like}`} <span className="celsius--small">C</span></span>
              <span className="text--small">{`давление: ${props.forecast.list[0].main.pressure} мм. рт. ст.`}</span>
              <span className="text--small">{`влажность воздуха: ${props.forecast.list[0].main.humidity} %`}</span>
            </div>
          </InfoWindow>
          )
        }
      </GoogleMap>
    : null
  )
}))

export default ForecastMap
