import { connect } from 'react-redux';
import Weather from './weather'
import { fetchWeatherById, fetchForecastById, setIsWaiting, setDefaultId, saveCity } from '../../actions/actions'


const matStateToProps = (state) => {
  return {
    curCity: state.curCity,
    apiKey: state.apiKey,
    defaultId: state.defaultId,
    isForecast: state.isForecast,
    saveCities: state.saveCities
  };
}

const mapDispathToProps = (dispatch) => {
  return {
    fetchWeatherById : (id, apiKey, actionType) => {dispatch(fetchWeatherById(id, apiKey, actionType))},
    fetchForecastById: (id, apiKey, actionType) => dispatch(fetchForecastById(id, apiKey, actionType)),
    setIsWaiting : (isWaiting) => dispatch(setIsWaiting(isWaiting)),
    setDefaultId : (id) => dispatch(setDefaultId(id)),
    saveCity: () => dispatch(saveCity())
  };
}


let WeatherContainer = connect(matStateToProps, mapDispathToProps)(Weather); 

export default WeatherContainer