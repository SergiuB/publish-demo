import React, { Component, PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import translate from './Translate';
import { getImage, resizeImageWidth } from '../util/image';

const style = { padding: 10 };
const textInputStyle = { width: '100%' };
const imageHolderStyle = { display: 'flex', alignItems: 'flex-start', marginTop: 10 };
const errorStyle = { fontSize: 12, lineHeight: 12, color: 'rgb(244, 67, 54)' };


class ArticleEditor extends Component {
  // promisify setState
  setStateP = (state) => new Promise((resolve) => this.setState(state, resolve));
  handleChange = this.handleChange.bind(this);
  handleImage = this.handleImage.bind(this);
  handleAddPicture = this.handleAddPicture.bind(this);
  handleLicenseChange = this.handleLicenseChange.bind(this);
  handleDateChange = this.handleDateChange.bind(this);
  handleAuthorChange = this.handleAuthorChange.bind(this);
  handleTitleChange = this.handleTitleChange.bind(this);
  handleContentChange = this.handleContentChange.bind(this);

  handleChange() {
    this.props.onChange({ ...this.state });
  }

  handleAuthorChange(event) {
    this.setStateP({ author: event.target.value })
      .then(this.handleChange);
  }

  handleTitleChange(event) {
    this.setStateP({ title: event.target.value })
      .then(this.handleChange);
  }

  handleContentChange(event) {
    this.setStateP({ content: event.target.value })
      .then(this.handleChange);
  }

  handleLicenseChange(event, index, value) {
    this.setStateP({ license: value })
      .then(this.handleChange);
  }

  handleDateChange(event, date) {
    this.setStateP({ publishingDate: date.toString() })
      .then(this.handleChange);
  }

  handleImage(event) {
    const file = event.target.files[0];
    const resizeImage = (image) => [100, 150, 200].map(resizeImageWidth.bind(null, image));

    if (file.type.match(/image.*/)) {
      getImage(file)
        .then(resizeImage)
        .then(([small, med, high]) => ({ featuredImage: { small, med, high } }))
        .then(this.setStateP)
        .then(this.handleChange);
    }
  }

  handleAddPicture() {
    this.fileInput && this.fileInput.click();
  }

  componentWillMount() {
    this.setState({ ...this.props.article });
  }

  render() {
    const { author, title, content, license, publishingDate } = this.props.article;
    const { errors, strings } = this.props;
    const { featuredImage } = this.state;

    // show the medium resolution image in the preview
    let imageUrl;
    if (featuredImage && featuredImage.med && featuredImage.med.data) {
      imageUrl = featuredImage.med.data;
    }
    return (
      <Paper zDepth={1} style={style}>
        <TextField
          hintText={strings.author}
          floatingLabelText={strings.author}
          underlineShow={false}
          style={textInputStyle}
          value={author}
          errorText={errors.author}
          onChange={this.handleAuthorChange}
        />
        <Divider />
        <TextField
          hintText={strings.title}
          floatingLabelText={strings.title}
          underlineShow={false}
          style={textInputStyle}
          value={title}
          errorText={errors.title}
          onChange={this.handleTitleChange}
        />
        <Divider />
        <TextField
          hintText={strings.content}
          floatingLabelText={strings.content}
          underlineShow={false}
          multiLine
          style={textInputStyle}
          rows={1}
          value={content}
          errorText={errors.content}
          onChange={this.handleContentChange}
        />
        <Divider />
        <SelectField
          hintText="License"
          floatingLabelText="License"
          underlineShow={false}
          value={license}
          onChange={this.handleLicenseChange}
        >
          <MenuItem value="all" primaryText="All Rights Reserved" />
          <MenuItem value="some" primaryText="Some Rights Reserved" />
          <MenuItem value="none" primaryText="No Rights Reserved" />
        </SelectField>
        <Divider />
        <DatePicker
          hintText={strings.publishingDate}
          floatingLabelText={strings.publishingDate}
          underlineShow={false}
          value={new Date(publishingDate)}
          onChange={this.handleDateChange}
        />
        <Divider />
        <input
          type="file"
          multiple accept="image/*"
          style={{ display: 'none' }}
          ref={input => { this.fileInput = input; }}
          onChange={this.handleImage}
        />
        <div style={imageHolderStyle}>
          {errors.featuredImage && <div style={errorStyle}>{errors.featuredImage}</div>}
          {imageUrl && <img role="presentation" src={imageUrl} style={{ marginRight: 10 }} />}
          <RaisedButton
            label={imageUrl ? strings.changePicture : strings.addPicture}
            onClick={this.handleAddPicture}
          />
        </div>
      </Paper>
    );
  }
}

ArticleEditor.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    license: PropTypes.oneOf(['some', 'all', 'none']),
    publishingDate: PropTypes.string,
    featuredImage: PropTypes.object
  }).isRequired,
  errors: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    featuredImage: PropTypes.string
  }),
  onChange: PropTypes.func,
  strings: PropTypes.object,
};
ArticleEditor.defaultProps = {
  onChange: () => {},
  errors: {},
  strings: {
    author: 'Author',
    title: 'Title',
    content: 'Content',
    publishingDate: 'Publishing Date',
    changePicture: 'Change Picture',
    addPicture: 'Add Picture'
  }
};

export default translate('ArticleEditor')(ArticleEditor);
