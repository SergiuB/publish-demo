import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { editArticle } from '../actions/articles';
import ArticleEditor from '../components/ArticleEditor';

const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

class EditArticlePage extends Component {
  handleArticleChange = this.handleArticleChange.bind(this);
  handleOk = this.handleOk.bind(this);
  goBackHome = this.goBackHome.bind(this);
  getErrors = this.getErrors.bind(this);

  state = {
    article: {},
    errors: {},
  }

  handleOk() {
    if (!isEmpty(this.getErrors(this.state.article)))
      return;
    this.props.editArticle(this.props.article.id, this.state.article);
    this.goBackHome();
  }

  goBackHome() {
    this.props.push('/');
  }

  getErrors(article) {
    const { author } = article;
    let errors = {};
    !author && (errors = {...errors, author: 'Author name cannot be empty'});
    return errors;
  }

  handleArticleChange(changedArticle) {
    this.setState({
      article: changedArticle,
      errors: this.getErrors(changedArticle)
    })
  }

  componentWillMount() {
    this.setState({
      article: { ...this.props.article }
    });
  }

  render() {
    const { article, errors } = this.state;
    return (
      <div>
        <ArticleEditor article={article} errors={errors} onChange={this.handleArticleChange}/>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
          <RaisedButton label='Ok' primary={true} onClick={this.handleOk} />
          <RaisedButton label="Cancel" style={{ marginLeft: 10 }} onClick={this.goBackHome} />
        </div>
      </div>
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
