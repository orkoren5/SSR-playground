import express from "express";
import { render } from "preact-render-to-string";
import SSR from "./ssr";
import createStore from '../common/store'
const path = require("path");

const app = express();

const HTMLShell = (html, state) => `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
            <title> SSR Preact App </title>
        </head>
        <body>
            <div id="app">${html}</div>
      		<script>window.__STATE__=${JSON.stringify(state).replace(/<|>/g, '')}</script>
            <script src="./app.js"></script>
        </body>
    </html>`;

app.use(express.static(path.join(__dirname, "dist/client")));
app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.static("dist/client"));

app.get('/*', (req, res) => {
	try {
		const store = createStore({ count: 0, todo: [] });
		let state = store.getState();
		let html = render(<SSR store={store}/>);
		res.send(HTMLShell(html, state));
	}
	catch(err) {
		console.log(JSON.stringify(err));
		console.log(err);
		res.status(500);
		res.send(err);
	}
});

app.listen(4000, () => {
	console.log(`Server is listening on port ${4000}`);
});