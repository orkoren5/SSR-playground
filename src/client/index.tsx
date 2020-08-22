import { render } from 'preact'
import { Provider } from 'unistore/preact'
import Router from '../common/router'

import createStore from '../common/store'
import 'preact-material-components/Button/style.css';

//@ts-ignore
const store = createStore(window.__STATE__);

const app = document.getElementById('app');

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  app,
  app.lastChild as Element
);