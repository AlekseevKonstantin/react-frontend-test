import axios from 'axios';

export const createInstance = () => {

  const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 3000,
    Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
  }); 

// api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}
  function getWeatherByName (name, country, apiKey, dispathAction, dispatch) {
    return createAxios(
      instance.get('/weather', 
      { 
        params: {
          'q': `${name},${country}`,
          'appid': apiKey,
          'units': 'metric', 
          'lang': 'ru'
        } 
      }), dispathAction, dispatch);
  }

  function getWeatherById (id, apiKey, dispathAction, dispatch) {
    
    return createAxios(
      instance.get('/weather', 
      { 
        params: {
          'id': id,
          'appid': apiKey,
          'units': 'metric', 
          'lang': 'ru'
        } 
      }), dispathAction, dispatch);
  }

  // api.openweathermap.org/data/2.5/weather?id=452063&appid=bc023c2f5d4e592592014d0faa0c4523

  function getForecastDataByName (name, apiKey, dispathAction, dispatch) {
    return createAxios(
      instance.get('/forecast', 
      { 
        params: {
          'q': `${name}, ru`,
          'appid': apiKey,
          'units': 'metric', 
          'lang': 'ru'
        } 
      }), dispathAction, dispatch);
  }

  function getForecastDataById (id, apiKey, dispathAction, dispatch) {
    return createAxios(
      instance.get('/forecast', 
      { 
        params: {
          'id': id,
          'appid': apiKey,
          'units': 'metric', 
          'lang': 'ru'
        } 
      }), dispathAction, dispatch);
  }

  const createAxios = (res, dispathAction, dispatch) => {
    res
    .then(response => dispatch(dispathAction(response.data)))
    .catch(error => dispatch(dispathAction(error.request)));
  }


  return {
    getWeatherByName,
    getWeatherById,
    getForecastDataByName,
    getForecastDataById
  };
}