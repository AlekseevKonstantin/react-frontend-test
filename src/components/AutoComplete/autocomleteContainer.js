import { connect } from 'react-redux';
import AutoComplete from './autocomlete'
import { fetchWeatherById, fetchForecastById, setIsWaiting } from '../../actions/actions'

const matStateToProps = (state) => {
  return {
    apiKey: state.apiKey,
    defaultId: state.defaultId
  };
}

const mapDispathToProps = (dispatch) => {
  return {
    fetchWeatherById : (id, apiKey, actionType) => dispatch(fetchWeatherById(id, apiKey, actionType)),
    fetchForecastById: (id, apiKey, actionType) => dispatch(fetchForecastById(id, apiKey, actionType)),
    setIsWaiting: (isWaiting) => dispatch(setIsWaiting(isWaiting))
  };
}


let AutoCompleteContainer = connect(matStateToProps, mapDispathToProps)(AutoComplete); 

export default AutoCompleteContainer