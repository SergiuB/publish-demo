import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import EditArticlePage from './containers/EditArticlePage';
import AddArticlePage from './containers/AddArticlePage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/:articleId/edit" component={EditArticlePage} />
    <Route path="/create" component={AddArticlePage} />
  </Route>
);
