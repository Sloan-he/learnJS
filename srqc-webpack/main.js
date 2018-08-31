import React from 'react';
import { render } from 'react-dom';
import { AppComponent } from './AppComponent';

if (module.hot) {
  module.hot.accept();
}

// 把根组件渲染到 DOM 树上
render(<AppComponent/>, window.document.getElementById('app'));