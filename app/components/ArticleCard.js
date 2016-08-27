import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const cardStyle = { marginBottom: 10 };
const cardActionsStyle = { display: 'flex', justifyContent: 'center' };

export default function ArticleCard({ article, onEdit, onRemove }) {
  const { id, author, title, featuredImage } = article;
  let imageUrl ;
  if (featuredImage && featuredImage.high && featuredImage.high.data) {
    imageUrl = featuredImage.high.data;
  }
  return (
    <Card key={id} style={cardStyle}>
      <CardMedia
        overlay={<CardTitle title={title} subtitle={author}/>}
      >
        {imageUrl && <img src={imageUrl}/>}
      </CardMedia>
      <CardActions style={cardActionsStyle}>
        <RaisedButton
          label="Edit"
          labelPosition="before"
          onClick={() => onEdit(id)}
          primary={true}
          icon={<EditIcon />}
        />
        <RaisedButton
          label="Remove"
          labelPosition="before"
          onClick={() => onRemove(id)}
          icon={<DeleteIcon />}
        />
      </CardActions>
    </Card>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    title: PropTypes.string,
    featuredImage: PropTypes.object
  }).isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
};
ArticleCard.defaultProps = {
  onEdit: () => {},
  onRemove: () => {}
};
