import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ArticleList from '../components/ArticleList';

class HomePage extends Component {

  handleCreateArticle(id) {
    this.props.dispatch(push(`/create`));
  }

  render() {
    return (
      <div>
        <ArticleList />
        <button type="button" onClick={this.handleCreateArticle.bind(this)}>Create</button>
      </div>
    );
  }
}

export default connect()(HomePage)
