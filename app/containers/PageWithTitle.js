import React from 'react';
import AppBar from 'material-ui/AppBar';

const pageWithTitle = (title, InnerComponent) => (props) => (
  <div>
    <AppBar
      title={title}
      showMenuIconButton={false}
      style={{ marginBottom: 10 }}
    />
    <InnerComponent {...props} />
  </div>
);

export default pageWithTitle;
