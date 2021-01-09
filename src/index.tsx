import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import Mars from './Mars/Mars';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store()}>
    <Mars />
  </Provider>,
  document.getElementById('root')
);
