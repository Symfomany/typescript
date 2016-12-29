const path = require('path');
const { resolve } = require('path') // resolve a path frm directoriesconst CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin') // Simplifies creation of HTML files to serve


module.exports = {

    entry: {
        main: './src/main.ts'
    },

    output: {
        path: resolve('/dist'),
        filename: 'bundle.[name].[hash].js', // output file with hash for chunks
        pathinfo: true
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
            ]
        },
        {
            test: /\.ts(x)?$/,
            loaders: [
                'babel-loader?presets[]=es2015', //ou prendre ton .babelrc par defaut
                'awesome-typescript-loader?configFileName=tsconfig.json', // use your config ts
            ],
            exclude: [/node_modules/, /\.(spec|e2e)\.ts(x?)$/],
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