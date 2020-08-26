const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/client/index.tsx",
    mode: "development",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "dist", "client"),
        filename: "app.js",
        library: "MyShop",
        libraryTarget: "umd"
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
                            importLoaders: 1,
                            esModule: false
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