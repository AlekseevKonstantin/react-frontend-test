import c from './../consts/consts';
import { createInstance } from './../utils/utils';


function getSessionError (request) {
  if(request && request.status !== undefined){
    return true
  }
  return false;
}

export function saveCity() {
  return {type: c.SAVE_CITY}
}

export function setSaveCity (cities) {
  return {type: c.SET_SAVE_CITIES, cities}
}

export function setDefaultId (id) {
  return {type: c.SET_DEFAULT_ID, id}
}

export function setIsWaiting (isWaiting) {
  return {type: c.SET_IS_WAITING, isWaiting}
}

export function setCurCity (curCity) {
  const isWaitingStop = false
  const city = null

  if (!getSessionError (curCity) ) {
    return {type: c.SET_CUR_CITY, curCity, isWaitingStop}
  }

  return {type: c.SET_CUR_CITY, city, isWaitingStop}
}

export function setCheckCity(city) {
  return {type: c.SET_CHECK_CITY, city}
}

export function setIsForecast (isForecast) {
  return {type: c.SET_IS_FORECAST, isForecast}
}

function setForecastInfo(forecast) {
  return forecast.city
}

function setToday(forecast) {

  let list = forecast.list,
      now = new Date(),
      curDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      newForecast = {...forecast, list: []};

  for (let i = 0, len = list.length; i < len; i+=1) {
    let datetime = new Date (list[i].dt_txt),
        year = datetime.getFullYear(),
        month = datetime.getMonth(),
        date = datetime.getDate()
        date = new Date (year, month, date);

    if (+curDate.valueOf() === +date.valueOf()) {
      newForecast.list.push(list[i])
    }
  }
  
  return newForecast;
}

function setTomorrow(forecast) {

  let list = forecast.list,
  now = new Date(),
  tomorrowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()+1),
  newForecast = {...forecast, list: []};

  for (let i = 0, len = list.length; i < len; i+=1) {
    let datetime = new Date (list[i].dt_txt),
        year = datetime.getFullYear(),
        month = datetime.getMonth(),
        date = datetime.getDate()
        date = new Date (year, month, date);

    if (+tomorrowDate.valueOf() === +date.valueOf()) {
      newForecast.list.push(list[i])
    }
  }

  return newForecast;
}

function setWeek(forecast) {

  let list = forecast.list,
      newForecast = {...forecast, list: []};

  for (let i = 0, len = list.length; i < len; i+=1) {
    let datetime = new Date (list[i].dt_txt),
        hours = datetime.getHours();

    if (hours === 12) {
      newForecast.list.push(list[i])
    }
  }

  return newForecast;
}

function setForecast (forecast) {
  let todayForecast = null,
      tomorrowForecast = null,
      weekForecast = null;

  if (!getSessionError (forecast) ) {      
    todayForecast = setToday(forecast)
    tomorrowForecast = setTomorrow(forecast)
    weekForecast = setWeek(forecast)
  }
  
  return {todayForecast, tomorrowForecast, weekForecast}
    
}  

export function setCurForecast (forecast) {
  const isWaitingStop = false,
        {todayForecast, tomorrowForecast, weekForecast} = setForecast (forecast)

  return {type: c.SET_FORECAST, todayForecast, tomorrowForecast, weekForecast, isWaitingStop}
}

export function setDedailedForecast (forecast) {
  const isWaitingStop = false,
        forecastInfo = setForecastInfo(forecast),
        {todayForecast, tomorrowForecast, weekForecast} = setForecast (forecast),
        detailed = {
          info: forecastInfo,
          today: todayForecast, 
          tomorrow: tomorrowForecast, 
          week: weekForecast,
        }
  
  return {type: c.SET_DETAILED, detailed, isWaitingStop}
}


export function fetchWeatherById (id, apiKey, actionType) {

  let action = undefined; 

  switch (actionType) {
    case c.SET_CHECK_CITY:
      action = setCheckCity;
      break;
    case c.SAVE_CITY:
      action = saveCity;
      break
    default: 
      action = setCurCity;
      break;
  }

  return (dispatch) => {
    createInstance().getWeatherById(id, apiKey, action, dispatch);
  }
} 

export function fetchForecastById (id, apiKey, actionType) {

  let action = null

  switch(actionType) {
    case c.SET_DETAILED:
      action = setDedailedForecast
      break
    default:
      action = setCurForecast
      break
  }

  return (dispatch) => {
    createInstance().getForecastDataById(id, apiKey, action, dispatch);
  }
}