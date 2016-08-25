import React, { Component } from 'react';

export default class ArticleEditor extends Component {
  handleChange = this.handleChange.bind(this);

  handleChange() {
    this.props.onChange({
      author: this._nameInput.value,
      title: this._titleInput.value
    });
  }
  render() {
    console.log(this.props.article);
    const { author, title } = this.props.article;
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
      </div>
    )
  }
}
