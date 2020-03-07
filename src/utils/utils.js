import axios from 'axios';

export const createInstance = () => {

  const instance = axios.create({
    baseURL: 'api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}',
    timeout: 3000,
    Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
  }); 


  const getCities = (dispathAction, dispatch) => {
    return createAxios(
      instance.get('/api/protected/transactions', 
      { 
        headers: {
          'Authorization': "bearer " + authentication
        } 
      }), dispathAction, dispatch);
  }

  const createAxios = (res, dispathAction, dispatch) => {
    res
    .then(response => {
      if (dispathAction !== null && dispathAction !== undefined){
        dispatch(dispathAction(response.data, dispatch));
      }
    })
    .catch(error => dispatch(dispathAction(error.request)));
  }


  return {
    getCities
  };
}