const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: "./src/server/server.tsx",	
	target: 'node',
	externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, "dist", "server", "server"),
        filename: "server.js"
    },
    module: {
        rules: [
			{
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader'
            },
        ]
    },
	resolve: {
	  extensions: ['.js', '.jsx', '.tsx', '.ts']
	}
}