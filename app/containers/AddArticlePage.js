import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { addArticle } from '../actions/articles';
import ArticleEditDialog from '../containers/ArticleEditDialog';

class AddArticlePage extends Component {
  state = {
    article: {
      author: '',
      title: '',
      content: '',
      license: 'none',
      publishingDate: (new Date()).toString(),
    }
  };

  render() {
    const { article } = this.state;
    const { addArticle, push } = this.props;
    return (
      <ArticleEditDialog
        article={article}
        onOk={addArticle}
        onClose={() => push('/')}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, push }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddArticlePage);
