// Image utilities

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

export {
  resizeImageWidth,
  getImage,
}
