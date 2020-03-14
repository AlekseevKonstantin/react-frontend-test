import React from 'react'
import CityCard from './cityCard'
import './home.css'

export default function Home (props) {
  
  function cityToProps() {
    // debugger
    return props.saveCities.map((city, index) => {
      return ( <CityCard city={city}
                         setCity={props.setCurCity}
                         setIsWaiting={props.setIsWaiting} 
                         fetchForecastById={props.fetchForecastById}
                         apiKey={props.apiKey}
                         key={index}/>)
    })
  }

  return (
    <div className="change-container container">
      <h2 className="mb--medium">Сохраненные города</h2>
      <div className="row row--nm row--flex-wrap w100p">
        {props.saveCities && props.saveCities.length > 0 && cityToProps()}
      </div>
    </div>
  )  
}