import React from 'react';
import TitleBar from '../components/TitleBar';

const pageWithTitle = (title, InnerComponent) => (props) => (
  <div>
    <TitleBar
      title={title}
      style={{ marginBottom: 10 }}
    />
    <InnerComponent {...props} />
  </div>
);

export default pageWithTitle;
