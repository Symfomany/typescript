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
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
    }]
}