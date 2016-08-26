import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div style={{ width: '66%', margin: '0 auto'}}>
        {this.props.children}
      </div>
    );
  }
}
