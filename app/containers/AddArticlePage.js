import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { addArticle } from '../actions/articles';
import ArticleEditor from '../components/ArticleEditor';

class AddArticlePage extends Component {
  handleArticleChange = this.handleArticleChange.bind(this);
  handleOk = this.handleOk.bind(this);
  goBackHome = this.goBackHome.bind(this);

  state = {
    article: {
      author: '',
      title: ''
    }
  };

  handleOk() {
    this.props.addArticle(this.state.article);
    this.goBackHome();
  }

  goBackHome() {
    this.props.push('/');
  }

  handleArticleChange(changedArticle) {
    this.setState({
      article: changedArticle
    })
  }

  render() {
    const { article } = this.state;
    return (
      <div>
        <ArticleEditor article={article} onChange={this.handleArticleChange}/>
        <button type="button" onClick={this.handleOk}>Ok</button>
        <button type="button" onClick={this.goBackHome}>Cancel</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, push }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddArticlePage)
