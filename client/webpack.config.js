const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: ["./src/index.js"],
    // devtool: "inline-source-map",
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
    },
    devServer: {
        contentBase: "./dist",
        historyApiFallback: true
    },
/*     plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false
            }
        })
    ], */
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};