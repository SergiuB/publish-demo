import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { push } from 'react-router-redux';
import { removeArticle } from '../actions/articles';
import ArticleCard from './ArticleCard';
import translate from './Translate';

// compare two articles by their date
const byDate = (article1, article2) => {
  const [d1, d2] = [
    Date.parse(article1.publishingDate),
    Date.parse(article2.publishingDate)
  ];
  return d1 - d2;
};

class ArticleList extends Component {

  render() {
    const { articles, push, removeArticle, strings } = this.props;
    const showEmptyText = !articles || !articles.length;
    return (
      <div>
        {showEmptyText && (
          <div style={{ width: '100%', textAlign: 'center' }}>
            {strings.emptyList}
          </div>
        )}
        {articles
          .sort(byDate)
          .map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onEdit={id => push(`/${id}/edit`)}
              onRemove={id => removeArticle(id)}
            />
          ))
          }
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

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    license: PropTypes.oneOf(['some', 'all', 'none']),
    publishingDate: PropTypes.string,
    featuredImage: PropTypes.object
  })),
  push: PropTypes.func,
  removeArticle: PropTypes.func,
  strings: PropTypes.object.isRequired
};
ArticleList.defaultProps = {
  articles: [],
  push: () => {},
  removeArticle: () => {},
};

export default compose(
                  translate('ArticleList'),
                  connect(mapStateToProps, mapDispatchToProps)
                )(ArticleList);
