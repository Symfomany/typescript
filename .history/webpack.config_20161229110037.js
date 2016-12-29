const path = require('path');
const root = path.resolve(__dirname)

module.exports = {

    entry: {
        main: './src/main.ts'
    },

    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.[name].[hash].js', // output file
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',


    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    loaders: [{
        test: /\.ts(x)?$/,
        loaders: [
            'react-hot-loader',
            'babel-loader?presets[]=es2015',
            'awesome-typescript-loader?configFileName=tsconfig.json',
        ],
        exclude: [/node_modules/, /\.(spec|e2e)\.ts(x?)$/],
    }, ]
}