const path = require("path");

const clientConfig = {
    entry: "./src/client/index.js",
    output: {
        path: path.join(__dirname, "dist", "client"),
        filename: "app.js"
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
};

const serverConfig = {
    entry: "./src/server/server.js",
	node: { fs: "empty", net: "empty" },
    output: {
        path: path.join(__dirname, "dist", "server"),
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
};

module.exports = [clientConfig]