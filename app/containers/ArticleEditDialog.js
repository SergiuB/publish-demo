import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import ArticleEditor from '../components/ArticleEditor';
import translate from '../components/Translate';

const isEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

const buttonContainerStyle = { display: 'flex', justifyContent: 'flex-end', marginTop: 10 };

class ArticleEditDialog extends Component {
  getErrors = this.getErrors.bind(this);
  handleArticleChange = this.handleArticleChange.bind(this);
  handleOk = this.handleOk.bind(this);

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
    const { author, title, content, featuredImage } = article;
    let errors = {};
    !author && (errors = { ...errors, author: 'Author name cannot be empty' });
    !title && (errors = { ...errors, title: 'Title cannot be empty' });
    !content && (errors = { ...errors, content: 'Content cannot be empty' });
    (!featuredImage || isEmpty(featuredImage))
      && (errors = { ...errors, featuredImage: 'Must add a featured image' });
    return errors;
  }

  handleArticleChange(changedArticle) {
    this.setState({
      article: changedArticle,
      errors: this.getErrors(changedArticle)
    });
  }

  componentWillMount() {
    this.setState({
      article: { ...this.props.article }
    });
  }

  render() {
    const { article, errors } = this.state;
    const { onClose, strings } = this.props;
    return (
      <div>
        <ArticleEditor article={article} errors={errors} onChange={this.handleArticleChange} />
        <div style={buttonContainerStyle}>
          <RaisedButton label={strings.ok} primary onClick={this.handleOk} />
          <RaisedButton label={strings.cancel} style={{ marginLeft: 10 }} onClick={onClose} />
        </div>
      </div>
    );
  }
}

export default translate('ArticleEditDialog')(ArticleEditDialog);
