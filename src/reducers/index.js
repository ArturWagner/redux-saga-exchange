import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import exchange from './exchange';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  exchange
});

export default rootReducer;
