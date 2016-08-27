import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { editArticle } from '../actions/articles';
import ArticleEditDialog from '../containers/ArticleEditDialog';

const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

class EditArticlePage extends Component {
  handleOk = this.handleOk.bind(this);
  goBackHome = this.goBackHome.bind(this);

  handleOk(article) {
    this.props.editArticle(this.props.article.id, article);
  }

  goBackHome() {
    this.props.push('/');
  }

  render() {
    const { article } = this.props;
    return (
      <ArticleEditDialog article={article} onOk={this.handleOk} onClose={this.goBackHome} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const articleId = parseInt(ownProps.params.articleId, 10);
  const article = state.articles.find(article => article.id === articleId);
  return {
    article
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editArticle, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage)
