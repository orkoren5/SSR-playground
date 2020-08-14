// server.js
const express = require("express");
const render = require("preact-render-to-string");
import { h } from 'preact'
import { Provider } from 'unistore/preact'
const SSR = require("./ssr");
const path = require("path");

import Router from '../common/router'
import createStore from '../common/store'

const app = express();

const HTMLShell = (html, state) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css">
            <title> SSR Preact App </title>
        </head>
        <body>
            <div id="app">${html}</div>
      <script>window.__STATE__=${JSON.stringify(state).replace(/<|>/g, '')}</script>
            <script src="./app.js"></script>
        </body>
    </html>`

app.use(express.static(path.join(__dirname, "dist")));

app.get('/', (req, res) => {
	try {
		console.log(`Server starts`);
		
	  const store = createStore({ count: 0, todo: [] });
		console.log(1);

	  let state = store.getState();
		console.log(2);
	  let html = render(<SSR store={store}/>);
		console.log(3);
	  res.send(HTMLShell(html, state));
	}
	catch(err) {
		console.log(JSON.stringify(err));
		res.status(500);
		res.send(err);
	}
});

app.listen(4000);