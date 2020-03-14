import React from 'react'
import Forecast from '../forecast/forecast'
import WeekForecast from '../week/forecast'

export default function Detailed (props) {
  return (
    <div className="change-container  container">
      <div className="row row--nm row--flex-wrap">
        <div className="col w50p w100p-sm mb--medium-sm">
          <h2 className="mb--medium">Погода на сегодня</h2>
          <Forecast forecast={props.today} />
        </div>
        <div className="col w50p w100p-sm">
          <h2 className="mb--medium">Погода на завтра</h2>
          <Forecast forecast={props.tomorrow} />
        </div>
        <div className="col w100p mt--medium mb--medium">
          <h2 className="mb--medium">Погода на 5 дней</h2>
          <div className="row row--nm row--flex-wrap">
            <WeekForecast forecast={props.week} />
          </div>
        </div>
      </div>
    </div>
  )
}