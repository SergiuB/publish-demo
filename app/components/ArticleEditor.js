import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

const resizeImageWidth = (image, maxWidth) => {
  const canvas = document.createElement('canvas');
  let { width, height } = image;
  if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
  }
  canvas.width = width;
  canvas.height = height;

  canvas
    .getContext('2d')
    .drawImage(image, 0, 0, width, height);
  const data = canvas.toDataURL('image/jpeg');

  return { width, height, data };
}

const getImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload =  (readerEvent) => {
        var image = new Image();
        image.onload = () => resolve(image);
        image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(imageFile);
  });
}

export default class ArticleEditor extends Component {
  handleChange = this.handleChange.bind(this);
  handleImage = this.handleImage.bind(this);
  handleAddPicture = this.handleAddPicture.bind(this);
  handleLicenseChange = this.handleLicenseChange.bind(this);
  handleDateChange = this.handleDateChange.bind(this);
  handleAuthorChange = this.handleAuthorChange.bind(this);
  handleTitleChange = this.handleTitleChange.bind(this);
  handleContentChange = this.handleContentChange.bind(this);
  setStateP = (state) => new Promise((resolve) => this.setState(state, resolve));

  handleChange() {
    this.props.onChange({
      ...this.state
    });
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

    if(file.type.match(/image.*/)) {
        getImage(file)
          .then(resizeImage)
          .then(([small, med, high]) => ({ featuredImage: { small, med, high} }))
          .then(this.setStateP)
          .then(this.handleChange);
    }
  }

  handleAddPicture() {
    if (this._fileInput) {
      this._fileInput.click();
    }
  }

  render() {
    const { author, title, content, license, publishingDate } = this.props.article;
    const { featuredImage } = this.state;
    let imageUrl ;
    if (featuredImage && featuredImage.med && featuredImage.med.data) {
      try {
        imageUrl = featuredImage.high.data;
      } catch(e) {}
    }
    return (
      <Paper zDepth={1} style={{ padding: 10}}>
        <TextField
          hintText="Author"
          floatingLabelText="Author"
          underlineShow={false}
          value={author}
          onChange={this.handleAuthorChange}
        />
        <Divider />
        <TextField
          hintText="Title"
          floatingLabelText="Title"
          underlineShow={false}
          value={title}
          onChange={this.handleTitleChange}
        />
        <Divider />
        <TextField
          hintText="Content"
          floatingLabelText="Content"
          underlineShow={false}
          multiLine={true}
          style={{ width: '100%' }}
          rows={2}
          value={content}
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
          <MenuItem value='all' primaryText="All Rights Reserved" />
          <MenuItem value='some' primaryText="Some Rights Reserved" />
          <MenuItem value='none' primaryText="No Rights Reserved" />
        </SelectField>
        <Divider />
        <DatePicker
          hintText="Publishing Date"
          floatingLabelText="Publishing Date"
          value={new Date(publishingDate)}
          onChange={this.handleDateChange}
        />
        <Divider />
        <input
          type="file"
          multiple accept="image/*"
          style={{ display: 'none'}}
          ref={input => this._fileInput = input}
          onChange={this.handleImage}
        />
        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 10 }}>
          {imageUrl && <img src={imageUrl} style={{ marginRight: 10 }}/>}
          <RaisedButton
            label={imageUrl ? "Change picture" : "Add picture"}
            onClick={this.handleAddPicture}
          />
        </div>
      </Paper>
    )
  }

  componentWillMount() {
    this.setState({ ...this.props.article });
  }
}
