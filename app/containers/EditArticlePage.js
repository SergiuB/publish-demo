import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { editArticle } from '../actions/articles';
import ArticleEditDialog from '../containers/ArticleEditDialog';

class EditArticlePage extends Component {

  render() {
    const { article, editArticle, push } = this.props;
    const { id } = article;
    return (
      <ArticleEditDialog
        article={article}
        onOk={editedArticle => editArticle(id, editedArticle)}
        onClose={() => push('/')}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const articleId = parseInt(ownProps.params.articleId, 10);
  const article = state.articles.find(art => art.id === articleId);
  return {
    article
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editArticle, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage);
