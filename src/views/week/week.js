import React from 'react'

import { months } from '../../utils/enum'
import WeekForecast from './forecast'

export default function Week (props) {

  const start = new Date(props.forecast ? props.forecast.list[0].dt_txt : ''),
        end = new Date(props.forecast ? props.forecast.list[props.forecast.list.length-1].dt_txt : '');

  return (
    <div className="change-container  container">
      <div className="w100p">
        <h2 className="mb--small">Погода на 5 дней</h2>
        <span className="text mb--medium">{`${months[start.getMonth().toString()]}, ${start.getDate()} - ${months[end.getMonth().toString()]}, ${end.getDate()}`}</span>
      </div>
      <div className="row row--nm row--flex-wrap">
        <WeekForecast forecast={props.forecast} />
      </div>
    </div>
  );
}