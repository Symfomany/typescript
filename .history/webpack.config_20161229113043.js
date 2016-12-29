const path = require('path');
const { resolve } = require('path') // resolve a path frm directoriesconst CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin') // Simplifies creation of HTML files to serve
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        main: './src/main.ts'
    },

    output: {
        filename: 'bundle.[name].[hash].js', // output file with hash for chunks
        path: resolve('dist'),
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',
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
                'react-hot-loader',
                'babel-loader?presets[]=es2015', //ou prendre ton .babelrc par defaut
                'awesome-typescript-loader?configFileName=tsconfig.json', // use your config ts
            ],
            exclude: [/node_modules/],
        },

    ],
    plugins: [
        new HtmlWebpackPlugin({ // create index.html with injecting some JS, CSS
            template: './src/index.html',
            inject: 'body',
        }),
        new CopyWebpackPlugin([{
            from: './src/img',
            to: './img'
        }])
    ],
}