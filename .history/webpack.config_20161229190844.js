const { resolve } = require('path') // resolve a path frm directoriesconst CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin') // Simplifies creation of HTML files to serve
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin') //Progress Bar on Tasks 
const webpack = require('webpack'); //to access built-in plugins
const webpackValidator = require('webpack-validator') // Validate a Webpack configuration from loader & plugins used
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // Extract text from bundle into a file.
const CompressionPlugin = require("compression-webpack-plugin");


/**
 * To validate your config WebPack
 */
const config = webpackValidator({
    performance: { hints: false },
    entry: {
        main: './src/main.ts',
        vendor: './src/vendor.ts'
    },
    output: {
        filename: 'bundle.[name].js',
        path: resolve('dist')
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader',
                })
            },
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
                test: /\.js(x)?$/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react',
                exclude: [/node_modules/],

            },
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?configFileName=tsconfig.json',
                ],
                exclude: [/node_modules/],
            },
        ]
    },
    devtool: 'source-map',

    plugins: [
        new ProgressBarPlugin(), // progress bar
        new CheckerPlugin(),
        new CompressionPlugin(),
        new ExtractTextPlugin('styles.[name].css'),
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CopyWebpackPlugin([{
            from: './src/img',
            to: './img'
        }]),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        })
    ]

});

module.exports = config;