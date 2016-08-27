import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { addArticle } from '../actions/articles';
import ArticleEditDialog from '../containers/ArticleEditDialog';

class AddArticlePage extends Component {
  handleOk = this.handleOk.bind(this);
  goBackHome = this.goBackHome.bind(this);

  state = {
    article: {
      author: '',
      title: '',
      content: '',
      license: 'none',
      publishingDate: (new Date()).toString(),
    }
  };

  handleOk(article) {
    this.props.addArticle(article);
    this.goBackHome();
  }

  goBackHome() {
    this.props.push('/');
  }

  render() {
    const { article } = this.state;
    return (
      <ArticleEditDialog article={article} onOk={this.handleOk} onClose={this.goBackHome} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, push }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddArticlePage)
