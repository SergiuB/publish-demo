import React, { Component } from 'react';
import styles from './ArticleList.css';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


class ArticleList extends Component {

  handleEditArticle(id) {
    this.props.dispatch(push(`/${id}/edit`));
  }

  render() {
    const { articles } = this.props;
    const articleElement = ({ id, author, title, featuredImage }) => {
      let imageUrlSmall ;
      if (featuredImage && featuredImage.small && featuredImage.small.data) {
        try {
          imageUrlSmall = featuredImage.small.data;
        } catch(e) {}
      }
      return (
        <div key={id}>
          {imageUrlSmall && <img src={imageUrlSmall}/>}
          <span>{`${title} (by ${author})`}</span>
          <button type="button" onClick={this.handleEditArticle.bind(this, id)}>Edit</button>
        </div>
      )
    };
    return (
      <div>
        { articles.map(articleElement) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

export default connect(mapStateToProps)(ArticleList)
