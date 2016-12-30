const webpack = require('webpack'); //to access built-in plugins


/**
 * Webpack plugins
 */
const webpackValidator = require('webpack-validator') // Validate a Webpack configuration from loader & plugins used
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // Extract text from bundle into a file.
const CompressionPlugin = require("compression-webpack-plugin");


/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
    title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};


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
        path: resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css']
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