const path = require('path');
const { resolve } = require('path') // resolve a path frm directoriesconst CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin') // Simplifies creation of HTML files to serve
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin') //Progress Bar on Tasks 


const config = {
    entry: {
        main: './src/main.ts'
    },

    output: {
        filename: 'bundle.js',
        path: './dist'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'autoprefixer-loader',
                    'sass-loader'
                ],
                exclude: [/node_modules/],
            },
            {
                test: /\.ts(x)?$/,
                loaders: [
                    'babel-loader?presets[]=es2015', //ou prendre ton .babelrc par defaut
                    'awesome-typescript-loader?configFileName=tsconfig.json',
                ],
                exclude: [/node_modules/],
            },
        ]
    },
    devtool: 'source-map',

    plugins: [
        new ProgressBarPlugin(), // progress bar
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
};

module.exports = config;