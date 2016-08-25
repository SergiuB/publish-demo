// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import Counter from '../components/Counter';
// import * as CounterActions from '../actions/counter';
//
// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CounterActions, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { editArticle } from '../actions/articles';
import ArticleEditor from '../components/ArticleEditor';

class EditArticlePage extends Component {
  handleArticleChange = this.handleArticleChange.bind(this);
  handleOk = this.handleOk.bind(this);
  goBackHome = this.goBackHome.bind(this);

  handleOk() {
    this.props.editArticle(this.props.article.id, this.state.article);
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

  componentWillMount() {
    this.setState({
      article: {
        ...this.props.article
      }
    });
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

function mapStateToProps(state, ownProps) {
  const articleId = parseInt(ownProps.params.articleId, 10);
  const article = state.articles.find(article => article.id === articleId);
  console.log(article, articleId, ownProps);
  return {
    article
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editArticle, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditArticlePage)
