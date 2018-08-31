import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
require('./index.css')

class Button extends Component {
  render() {
    let hello = 'Hello,'
    return <h1>{hello}Webpack</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));