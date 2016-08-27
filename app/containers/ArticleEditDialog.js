import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import ArticleEditor from '../components/ArticleEditor';

const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

export default class ArticleEditDialog extends Component {
  handleArticleChange = this.handleArticleChange.bind(this);
  handleOk = this.handleOk.bind(this);
  getErrors = this.getErrors.bind(this);

  state = {
    article: {},
    errors: {},
  }

  handleOk() {
    const errors = this.getErrors(this.state.article);
    if (!isEmpty(errors)) {
      this.setState({ errors });
      return;
    }
    this.props.onOk(this.state.article);
    this.props.onClose();
  }

  getErrors(article) {
    const { author, title, content } = article;
    let errors = {};
    !author && (errors = {...errors, author: 'Author name cannot be empty'});
    !title && (errors = {...errors, title: 'Title name cannot be empty'});
    !content && (errors = {...errors, content: 'Content name cannot be empty'});
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
    const { onClose } = this.props;
    return (
      <div>
        <ArticleEditor article={article} errors={errors} onChange={this.handleArticleChange}/>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
          <RaisedButton label='Ok' primary={true} onClick={this.handleOk} />
          <RaisedButton label="Cancel" style={{ marginLeft: 10 }} onClick={onClose} />
        </div>
      </div>
    );
  }
}
