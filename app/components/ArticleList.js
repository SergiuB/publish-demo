import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { removeArticle } from '../actions/articles';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ArticleList extends Component {

  handleEditArticle(id) {
    this.props.push(`/${id}/edit`);
  }

  handleRemoveArticle(id) {
    this.props.removeArticle(id);
  }

  render() {
    const { articles } = this.props;
    const articleElement = ({ id, author, title, featuredImage }) => {
      let imageUrlSmall ;
      if (featuredImage && featuredImage.high && featuredImage.high.data) {
        try {
          imageUrlSmall = featuredImage.high.data;
        } catch(e) {}
      }
      return (
        <Card key={id} style={{ marginBottom: 10 }}>
          <CardMedia
            overlay={<CardTitle title={title} subtitle={author}/>}
          >
            {imageUrlSmall && <img src={imageUrlSmall}/>}
          </CardMedia>
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <RaisedButton
              label="Edit"
              labelPosition="before"
              onClick={this.handleEditArticle.bind(this, id)}
              primary={true}
              icon={<EditIcon />}
            />
            <RaisedButton
              label="Remove"
              labelPosition="before"
              onClick={this.handleRemoveArticle.bind(this, id)}
              icon={<DeleteIcon />}
            />
          </CardActions>
        </Card>
      )
    };
    const showEmptyText = !articles || !articles.length;
    return (
      <div>
        {showEmptyText && (
          <div style={{ width: '100%', textAlign: 'center' }}>
            We have no articles to show you, help us create one!
          </div>
        )}
        {articles.map(articleElement)}
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
