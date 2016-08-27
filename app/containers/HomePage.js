import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ArticleList from '../components/ArticleList';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

function HomePage(props) {
  return (
    <div>
      <ArticleList />
      <FloatingActionButton
        secondary={true}
        style={style}
        onClick={() => props.dispatch(push('/create'))}
      >
        <ContentAdd />
      </FloatingActionButton>

    </div>
  );
}

export default connect()(HomePage)
