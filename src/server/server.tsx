import express from "express";
import { render } from "preact-render-to-string";
import SSR from "./ssr";
import createStore from '../client/store'
const path = require("path");
import StyleContext from "../common/StyleContext";

const app = express();

const HTMLShell = (html, state, css, ids) => {
	const styles = css.map((css, index) => `<style id="${ids[index]}">${css}</style>\n`);
	return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
            ${styles}            
            <title> SSR Preact App </title>
        </head>
        <body>
            <div id="app">${html}</div>
      		<script>window.__STATE__=${JSON.stringify(state).replace(/<|>/g, '')}</script>
            <script src="./app.js"></script>
        </body>
    </html>`;
};

app.use(express.static(path.join(__dirname, "dist/client")));
app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.static("dist/client"));

app.get('/*', (req, res) => {
	try {
		const css: string[] = []; // CSS for all rendered React components
		const ids: string[] = [];
		const insertCss = (...styles) => {
			styles.forEach((style, i) => {
				ids.push("s" + style._getContent()[0][0] + "-" + i);
				css.push(style._getCss());
				return;
			});
			return () => {};
		};

		const store = createStore({ count: 0, todo: [] });
		let state = store.getState();
		let html = render(
			<StyleContext.Provider value={{insertCss}}>
				<SSR store={store}/>
			</StyleContext.Provider>
		);

		res.send(HTMLShell(html, state, css, ids));
	}
	catch(err) {
		console.log(JSON.stringify(err));
		console.log(err);
		res.status(500);
		res.send(err);
	}
});

app.listen(80, () => {
	console.log(`Server is listening on port ${80}`);
});