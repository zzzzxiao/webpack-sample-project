var path = require("path");
var webpack = require("webpack");
// import HtmlWebpackPlugin from 'html-webpack-plugin';
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // root: path.resolve("/", "component"),
    devtool: "eval-source-map",
    // entry:{
    // 	component:['./component/index.js']
    // },
    // entry: "./component/index.js",
    entry:"./index.js",
    output: {
        path: __dirname + "/public",
        // publicPath: "/build",
        publicPath:"",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style!css?modules'
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                // query:{
                // 	presets:['es2015','react']
                // }
            }
        ]
    },
    postcss: [require("autoprefixer")],
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({ template: __dirname + "/component/template.ejs" })
    ],
    devServer: {
        inline: true,
        hot: true,
        contentBase: "./build",
        port: '8080'
    }
};
