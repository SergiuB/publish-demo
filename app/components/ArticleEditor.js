import React, { Component } from 'react';

/* Utility function to convert a canvas to a BLOB */
const dataURLToBlob = (dataURL) => {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        const parts = dataURL.split(',');
        const contentType = parts[0].split(':')[1];
        const raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: "image/jpeg" } );
}
/* End Utility function to convert a canvas to a BLOB      */

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
  const data = dataURLToBlob(dataUrl);
  return {
    width,
    height,
    data
  };
}

const processImage = (imageFile, processingFn) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload =  (readerEvent) => {
        var image = new Image();
        image.onload = () => resolve(processingFn(image));
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
    // Ensure it's an image
    if(file.type.match(/image.*/)) {
        processImage(file, (image) => [100, 150, 200].map(resizeImageWidth.bind(null, image)))
          .then(([small, med, high]) => this.setState({
            featuredImage: {
              small,
              med,
              high
            }
          }));
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
      imageUrlSmall = URL.createObjectURL( featuredImage.med.data );
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
