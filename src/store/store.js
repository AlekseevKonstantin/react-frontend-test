import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import c from '../consts/consts';

let initialState = {
  saveCities: [],
  curCity: null,
  apiKey: 'bc023c2f5d4e592592014d0faa0c4523',
  defaultId: '524894',
  defaultName: 'Moscow',
  isWaiting: true,
  todayForecast: null,
  tomorrowForecast: null,
  weekForecast: null,
  isForecast: false,
  sessionError: undefined,
}

/* reducer */
const reducer = (state = initialState, action) => {
  
  switch (action.type){
    case c.SET_IS_WAITING:
      let s = {...state, isWaiting: action.isWaiting}
      console.dir(s)
      return s
    case c.SET_DEFAULT_ID: 
      return {...state, defaultId: action.id}
    case c.SET_CUR_CITY:
       return {...state, curCity: action.curCity, isWaiting: action.isWaiting};
    case c.SAVE_CITY: 
      return {...state, saveCities: [...state.saveCities, state.curCity]}
    case c.SET_SAVE_CITIES:
      return {...state, saveCities: action.cities}
    case c.SET_IS_FORECAST:
      return {...state, isForecast: action.isForecast}
    case c.SET_FORECAST:
      return {...state, todayForecast: action.todayForecast, 
                        tomorrowForecast: action.tomorrowForecast, 
                        weekForecast: action.weekForecast, 
                        isWaiting: action.isWaiting}
    default: 
      return {...state};
  };

}

export let store = createStore(reducer, 
                                initialState,
                                applyMiddleware(thunk)/* , 
                                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */);