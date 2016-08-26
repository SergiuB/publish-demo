import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import EditArticlePage from './containers/EditArticlePage';
import AddArticlePage from './containers/AddArticlePage';
import pageWithTitle from './containers/PageWithTitle';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={pageWithTitle('Latest articles', HomePage)} />
    <Route path="/:articleId/edit" component={pageWithTitle('Edit article', EditArticlePage)} />
    <Route path="/create" component={pageWithTitle('Add article', AddArticlePage)} />
  </Route>
);
