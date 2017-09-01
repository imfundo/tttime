const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: ["./src/index.prod.js"],
    // devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            }
        })
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};