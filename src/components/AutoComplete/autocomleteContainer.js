import { connect } from 'react-redux';
import AutoComplete from './autocomlete'
import { fetchWeatherById, setDefaultId } from '../../actions/actions'

const matStateToProps = (state) => {
  return {
    apiKey: state.apiKey,
  };
}

const mapDispathToProps = (dispatch) => {
  return {
    fetchWeatherById : (id, apiKey, actionType) => dispatch(fetchWeatherById(id, apiKey, actionType)),
    setDefaultId: (id) => dispatch(setDefaultId(id))
  };
}


let AutoCompleteContainer = connect(matStateToProps, mapDispathToProps)(AutoComplete); 

export default AutoCompleteContainer