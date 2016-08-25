import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

const store = configureStore({
  articles: [
    { id: 1, author: 'Keisha N. Blain, PhD', title: '52 years ago, this speech changed the course of black voting rights in America'},
    { id: 2, author: 'Gayatri Nair', title: 'Bollywood, Bands and Beauty-queens'}
  ]
});
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
