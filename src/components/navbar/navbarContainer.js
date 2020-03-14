import { connect } from 'react-redux';
import Navbar from './navbar'
import { setIsForecast } from '../../actions/actions'


const matStateToProps = (state) => {
  return {
   
  };
}

const mapDispathToProps = (dispatch) => {
  return {
    setIsForecast : (IsForecast) => dispatch(setIsForecast(IsForecast))
  };
}


let NavbarContainer = connect(matStateToProps, mapDispathToProps)(Navbar); 

export default NavbarContainer