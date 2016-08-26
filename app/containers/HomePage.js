import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ArticleList from '../components/ArticleList';

import AppBar from 'material-ui/AppBar';

const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

class HomePage extends Component {

  handleCreateArticle(id) {
    this.props.dispatch(push(`/create`));
  }

  render() {
    return (
      <div>
        <AppBar
          title="Latest articles"
          showMenuIconButton={false}
        />
        <ArticleList />

        <FloatingActionButton secondary={true} style={style} onClick={this.handleCreateArticle.bind(this)} >
          <ContentAdd />
        </FloatingActionButton>

      </div>
    );
  }
}

export default connect()(HomePage)
