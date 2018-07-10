import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
require('./index.css')

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button/>, window.document.getElementById('app'));