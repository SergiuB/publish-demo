import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import EditArticlePage from './containers/EditArticlePage';
import AddArticlePage from './containers/AddArticlePage';
import pageWithTitle from './containers/PageWithTitle';

// these are keys in the TitleBar object of the translation files
// (see i18n/en.js)
const LIST_TITLE = 'listTitle';
const EDIT_TITLE = 'editTitle';
const ADD_TITLE = 'addTitle';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={pageWithTitle(LIST_TITLE, HomePage)} />
    <Route path="/:articleId/edit" component={pageWithTitle(EDIT_TITLE, EditArticlePage)} />
    <Route path="/create" component={pageWithTitle(ADD_TITLE, AddArticlePage)} />
  </Route>
);
