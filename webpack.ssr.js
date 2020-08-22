const path = require("path");
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/server/server.tsx",
    mode: "development",
	target: 'node',
	externals: [nodeExternals({ allowlist: [/^preact-material-components\//] })],
    output: {
        path: path.join(__dirname, "dist", "server", "server"),
        filename: "server.js",
        library: "MyShop",
        libraryTarget: "commonjs"
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
			{
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'isomorphic-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
	resolve: {
	  extensions: ['.js', '.jsx', '.tsx', '.ts']
	}
};