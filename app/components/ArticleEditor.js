import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

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

  state = {
    featuredImage: null
  }

  handleChange() {
    this.props.onChange({
      author: this._nameInput.getValue(),
      title: this._titleInput.getValue(),
      content: this._contentInput.getValue(),
      featuredImage: this.state.featuredImage
    });
  }

  handleImage(event) {
    const file = event.target.files[0];
    const resizeImage = (image) => [100, 150, 200].map(resizeImageWidth.bind(null, image));

    const setStateP = (state) => new Promise((resolve) => this.setState(state, resolve));
    if(file.type.match(/image.*/)) {
        getImage(file)
          .then(resizeImage)
          .then(([small, med, high]) => ({ featuredImage: { small, med, high} }))
          .then(setStateP)
          .then(this.handleChange);
    }
  }

  handleAddPicture() {
    if (this._fileInput) {
      this._fileInput.click();
    }
  }

  render() {
    const { author, title, content } = this.props.article;
    const { featuredImage } = this.state;
    let imageUrl ;
    if (featuredImage && featuredImage.med && featuredImage.med.data) {
      try {
        imageUrl = featuredImage.med.data;
      } catch(e) {}
    }
    return (
      <Paper zDepth={1} style={{ padding: 10}}>
        <TextField
          hintText="Author"
          floatingLabelText="Author"
          value={author}
          ref={input => this._nameInput = input}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Title"
          floatingLabelText="Title"
          value={title}
          ref={input => this._titleInput = input}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Content"
          floatingLabelText="Content"
          multiLine={true}
          rows={2}
          value={content}
          ref={input => this._contentInput = input}
          onChange={this.handleChange}
        />
        <input
          type="file"
          multiple accept="image/*"
          style={{ display: 'none'}}
          ref={input => this._fileInput = input}
          onChange={this.handleImage}
        />
        <button type="button" onClick={this.handleAddPicture}>
          {imageUrl ? "Change picture" : "Add picture"}
        </button>
        {imageUrl && <img src={imageUrl} />}
      </Paper>
    )
  }

  componentWillMount() {
    const { featuredImage } = this.props.article;
    this.setState({ featuredImage });
  }
}
