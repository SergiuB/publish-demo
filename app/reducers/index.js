import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import articles from './articles';
import language from './language';

const rootReducer = combineReducers({
  articles,
  language,
  routing
});

export default rootReducer;
