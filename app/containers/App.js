import React, { Component, PropTypes } from 'react';


const style = { width: '66%', margin: '0 auto'};

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
