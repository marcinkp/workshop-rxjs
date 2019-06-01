import React from 'react';
import './index.css';
import './App.css';

export default class Result extends React.Component {
  render() {
    return (
        <div className={this.props.className}>
          <pre>
            {this.syntaxHighlight(this.props.value)}
          </pre>
          </div>
    );
  }

  syntaxHighlight(json) {
    json = JSON.stringify(json, undefined, ' ')
    return  json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g,
        '&gt;');
  }
}