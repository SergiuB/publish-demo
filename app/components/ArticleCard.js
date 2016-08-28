import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { Card, CardActions, CardMedia, CardTitle } from 'material-ui/Card';

import translate from './Translate';

const cardStyle = { marginBottom: 10 };
const cardActionsStyle = { display: 'flex', justifyContent: 'center' };

function ArticleCard({ article, strings, onEdit, onRemove }) {
  const { id, author, title, publishingDate, featuredImage } = article;
  let imageUrl;
  if (featuredImage && featuredImage.high && featuredImage.high.data) {
    imageUrl = featuredImage.high.data;
  }
  return (
    <Card key={id} style={cardStyle}>
      <CardMedia
        overlay={
          <CardTitle
            title={title}
            subtitle={`${author} (publishing date: ${new Date(publishingDate).toDateString()})`}
          />}
      >
        {imageUrl && <img role="presentation" src={imageUrl} />}
      </CardMedia>
      <CardActions style={cardActionsStyle}>
        <RaisedButton
          label={strings.edit}
          labelPosition="before"
          onClick={() => onEdit(id)}
          primary
          icon={<EditIcon />}
        />
        <RaisedButton
          label={strings.remove}
          labelPosition="before"
          onClick={() => onRemove(id)}
          icon={<DeleteIcon />}
        />
      </CardActions>
    </Card>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    title: PropTypes.string,
    featuredImage: PropTypes.object
  }).isRequired,
  strings: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
};
ArticleCard.defaultProps = {
  onEdit: () => {},
  onRemove: () => {}
};

export default translate('ArticleCard')(ArticleCard);
