// index.js
import { h, render } from 'preact'
import { Provider } from 'unistore/preact'
import Router from '../common/router'

import createStore from '../common/store'

const store = createStore(window.__STATE__);

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  app,
  app.lastChild
);