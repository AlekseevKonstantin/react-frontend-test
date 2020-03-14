import React, { useState } from 'react'
import { Link }  from "react-router-dom"
import { getCityById } from '../../store/cities'

export default function CityCard (props) {
  
  const [city] = useState(() => {
    const city = getCityById(props.city.id)
    return city;
  })
  
  function redirectLinkHandler() {
   
    props.setCity(props.city)
    props.setIsWaiting(true)
    setTimeout(()=>{
      props.fetchForecastById(props.city.id, props.apiKey)
    }, 100)
    
  }

  return (
    <div className="col w20p mb--less-medium">
      <Link to={`city/${city}`} className="card" onClick={redirectLinkHandler}>
        <h5 className="card__title">{props.city.main.temp}<span className="celsius">C</span></h5>
        <span className="card__caption">{props.city.name}</span>
      </Link>
    </div>
  )
}