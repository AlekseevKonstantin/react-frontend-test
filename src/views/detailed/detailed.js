import React, { useEffect } from 'react'
import Forecast from '../forecast/forecast'
import WeekForecast from '../week/forecast'

export default function Detailed (props) {

  useEffect(()=>{
    window.scrollTo(0, 0);
  }, [])

  return (
    props.detailed ?
    <div className="change-container  container">
      <div className="row row--nm row--flex-wrap">
        <div className="col w100p">
          <h2 className="text--center mb--medium">{props.detailed.info.name}</h2>
        </div>
        <div className="col w50p w100p-sm mb--medium-sm">
          <h3 className="mb--medium">Погода на сегодня</h3>
          <Forecast forecast={props.detailed.today} />
        </div>
        <div className="col w50p w100p-sm">
          <h3 className="mb--medium">Погода на завтра</h3>
          <Forecast forecast={props.detailed.tomorrow} />
        </div>
        <div className="col w100p mt--medium mb--medium">
          <h3 className="mb--medium">Погода на 5 дней</h3>
          <div className="row row--nm row--flex-wrap">
            <WeekForecast forecast={props.detailed.week} />
          </div>
        </div>
      </div>
    </div>
    :
    <div className="change-container  container">
      <div className="row row--nm row--flex-wrap">
        <div className="col w100p">
          <h2 className="text--center mb--medium">Информация не найдена</h2>
        </div>
      </div>
    </div>
  )
}