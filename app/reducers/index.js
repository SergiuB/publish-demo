import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import articles from './articles';

const rootReducer = combineReducers({
  articles,
  routing
});

export default rootReducer;
