const path = require('path');
const root = path.resolve(__dirname)

module.exports = {

    entry: {
        main: './src/main.ts'
    },

    output: {
        path: path.resolve('/dist'),
        filename: 'bundle.[name].[hash].js', // output file
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',
    loaders: [{
        test: /\.ts(x)?$/,
        loaders: [
            'babel-loader?presets[]=es2015',
            'awesome-typescript-loader?configFileName=tsconfig.json',
        ],
        exclude: [/node_modules/, /\.(spec|e2e)\.ts(x?)$/],
    }, ]
}