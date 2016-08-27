import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default function ArticleCard({ article, onEdit, onRemove }) {
  const { id, author, title, featuredImage } = article;
  let imageUrl ;
  if (featuredImage && featuredImage.high && featuredImage.high.data) {
    imageUrl = featuredImage.high.data;
  }
  return (
    <Card key={id} style={{ marginBottom: 10 }}>
      <CardMedia
        overlay={<CardTitle title={title} subtitle={author}/>}
      >
        {imageUrl && <img src={imageUrl}/>}
      </CardMedia>
      <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
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
