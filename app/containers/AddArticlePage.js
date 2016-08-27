import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';

import { addArticle } from '../actions/articles';
import ArticleEditor from '../components/ArticleEditor';

class AddArticlePage extends Component {
  handleArticleChange = this.handleArticleChange.bind(this);
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
          <RaisedButton label='Ok' primary={true} onClick={this.handleOk} />
          <RaisedButton label="Cancel" style={{ marginLeft: 10 }} onClick={this.goBackHome} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addArticle, push }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddArticlePage)
