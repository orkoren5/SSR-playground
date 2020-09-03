const path = require("path");
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/server/server.tsx",
    mode: "development",
    devtool: "source-map",
	target: 'node',
	externals: [nodeExternals({ allowlist: [/^preact-material-components\//] })],
    output: {
        path: path.join(__dirname, "dist", "server"),
        filename: "app.js",
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
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            importLoaders: 1
                        }
                    }
                ]
            }
        ]
    },
	resolve: {
	  extensions: ['.js', '.jsx', '.tsx', '.ts']
	}
};