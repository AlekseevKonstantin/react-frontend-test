import { connect } from 'react-redux';
import Home from './home'
import { fetchForecastById, setCurCity, setIsWaiting } from '../../actions/actions'


const matStateToProps = (state) => {
  return {
    saveCities: state.saveCities,
    defaultName: state.defaultName,
    apiKey: state.apiKey 
  };
}

const mapDispathToProps = (dispatch) => {
  return {
    fetchForecastById: (id, apiKey) => dispatch(fetchForecastById(id, apiKey)),
    setCurCity: (city) => dispatch(setCurCity(city)),
    setIsWaiting: (isWaiting) => dispatch(setIsWaiting(isWaiting))
  };
}


let HomeContainer = connect(matStateToProps, mapDispathToProps)(Home); 

export default HomeContainer