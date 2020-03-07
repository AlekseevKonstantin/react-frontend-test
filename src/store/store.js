import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import c from '../consts/consts';

let initialState = {
  citys: []
}

/* reducer */
const reducer = (state = initialState, action) => {
  
  switch (action.type){
    case c.GET_CITIES:
      return {...state};
 
    default: 
      return {...state};
  };

}

export let store = createStore(reducer, 
                                initialState,
                                applyMiddleware(thunk)/* , 
                                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */);