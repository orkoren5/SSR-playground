import { render } from 'preact'
import { Provider } from 'unistore/preact'
import Router from './router'
import createStore from './store'
import StyleContext from "../common/StyleContext";

//@ts-ignore
const store = createStore(window.__STATE__);

const app = document.getElementById('app');

const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss());
    return () => removeCss.forEach(dispose => dispose());
};

render(
  <Provider store={store}>
      <StyleContext.Provider value={{insertCss}}>
          <Router />
      </StyleContext.Provider>
  </Provider>,
  app,
  app.lastChild as Element
);