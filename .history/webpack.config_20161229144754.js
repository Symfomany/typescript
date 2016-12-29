const { resolve } = require('path') // resolve a path frm directoriesconst CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin') // Simplifies creation of HTML files to serve
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin') //Progress Bar on Tasks 
const webpack = require('webpack'); //to access built-in plugins
const webpackValidator = require('webpack-validator') // Validate a Webpack configuration from loader & plugins used

/**
 * To validate your config WebPack
 */
const config = webpackValidator({
    entry: {
        main: 'src/main.ts'
    },

    output: {
        filename: 'bundle.[name].js',
        path: resolve('dist')
    },
    resolve: {
        extensions: ['.ts ', '.js ', '.json '],
    },
    module: {
        loaders: [{
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

});

module.exports = config;