var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCss = new ExtractTextPlugin({
    filename: "[name].[contenthash:4].css"
})

module.exports = {
    entry: {
        home: "./src/entry/home/home.js",
        catalog: "./src/entry/catalog/catalog.js"
    },
    output: {
        path: path.join(__dirname, "dist/"),
        pathinfo: true,
        filename: "[name].[chunkhash:4].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css/,
                loader: extractCss.extract({
                    fallbackLoader: 'style-loader',
                    loader: ["css", "postcss", 'resolve-url']
                })
            },
            {
                test: /\.scss/,
                loader: extractCss.extract({
                    fallbackLoader: 'style-loader',
                    loader: ["css", "postcss", "resolve-url", "sass"]
                })
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            debug: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: "[name].[chunkhash:4].js",
            minChunks: (mod) => {
                if (typeof mod.resource !== 'string') {
                    return false
                }

                const isThirdParty = mod.resource.indexOf('node_modules') !== -1
                    || mod.resource.indexOf('bower_components') !== -1

                return isThirdParty
            },
            chunks: ["home", "catalog"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.[chunkhash:4].js",
            chunks: ["home", "catalog"]
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            filename: "[name].[chunkhash:4].js",
        }),
        extractCss,
    ],
    resolveLoader: {
        moduleExtensions: ["-loader"]
    }
};
