import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { removeArticle } from '../actions/articles';

import ArticleCard from './ArticleCard';

class ArticleList extends Component {
  
  render() {
    const { articles, push, removeArticle } = this.props;
    const showEmptyText = !articles || !articles.length;
    return (
      <div>
        {showEmptyText && (
          <div style={{ width: '100%', textAlign: 'center' }}>
            We have no articles to show you, help us create one!
          </div>
        )}
        {articles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onEdit={id => push(`/${id}/edit`)}
            onRemove={id => removeArticle(id)}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeArticle, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
