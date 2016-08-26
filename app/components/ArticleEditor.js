import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
  setStateP = (state) => new Promise((resolve) => this.setState(state, resolve));

  state = {
    featuredImage: null,
    license: null,
  }

  handleChange() {
    console.log(this._licenseSelect);
    this.props.onChange({
      author: this._nameInput.getValue(),
      title: this._titleInput.getValue(),
      content: this._contentInput.getValue(),
      license: this.state.license,
      featuredImage: this.state.featuredImage
    });
  }

  handleLicenseChange(event, index, value) {
    this.setStateP({ license: value })
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
    const { author, title, content, license } = this.props.article;
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
          ref={input => this._nameInput = input}
          onChange={this.handleChange}
        />
        <Divider />
        <TextField
          hintText="Title"
          floatingLabelText="Title"
          underlineShow={false}
          value={title}
          ref={input => this._titleInput = input}
          onChange={this.handleChange}
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
          ref={input => this._contentInput = input}
          onChange={this.handleChange}
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
    const { featuredImage, license } = this.props.article;
    this.setState({ featuredImage, license });
  }
}
