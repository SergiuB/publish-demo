import React, { Component } from 'react';
import blobUtil from 'blob-util';

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
  const dataUrl = canvas.toDataURL('image/jpeg');
  return blobUtil.dataURLToBlob(dataUrl)
    .then(data => ({ width, height, data }));
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
      author: this._nameInput.value,
      title: this._titleInput.value
    });
  }

  handleImage(event) {
    const file = event.target.files[0];
    const resizeImage = (image) => Promise.all([100, 150, 200].map(resizeImageWidth.bind(null, image)));
    if(file.type.match(/image.*/)) {
        getImage(file)
          .then(resizeImage)
          .then(([small, med, high]) => ({ featuredImage: { small, med, high} }))
          .then(this.setState.bind(this));
    }
  }

  handleAddPicture() {
    if (this._fileInput) {
      this._fileInput.click();
    }
  }

  render() {
    const { author, title } = this.props.article;
    const { featuredImage } = this.state;
    let imageUrlSmall ;
    if (featuredImage) {
      imageUrlSmall = URL.createObjectURL( featuredImage.small.data );
    }
    return (
      <div>
        <input
          type="text"
          placeholder="Author"
          value={author}
          ref={input => this._nameInput = input}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          ref={input => this._titleInput = input}
          onChange={this.handleChange}
        />
        <input
          type="file"
          multiple accept="image/*"
          style={{ display: 'none'}}
          ref={input => this._fileInput = input}
          onChange={this.handleImage}
        />
        <button type="button" onClick={this.handleAddPicture}>Add picture</button>
        {imageUrlSmall && <img src={imageUrlSmall} />}
      </div>
    )
  }
}
