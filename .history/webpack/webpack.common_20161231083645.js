const helpers = require('./helpers');
const webpack = require('webpack'); //to access built-in plugins

/**
 * Webpack plugins
 */
const webpackValidator = require('webpack-validator') // Validate a Webpack configuration
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // Extract text from bundle into a file.
const CompressionPlugin = require("compression-webpack-plugin");
const { getIfUtils, removeEmpty } = require('webpack-config-utils')
const AssetsPlugin = require('assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const { resolve } = require('path')

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
    title: 'Test Webpackj by Boyer Julien',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = env => {
    const { ifProd, ifNotProd } = getIfUtils(env)

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
            extensions: ['.ts', '.tsx', '.js', '.jsx']
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
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file?name=public/fonts/[name].[ext]'
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
            new AssetsPlugin({
                path: helpers.root('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),
            new CompressionPlugin(),
            new ExtractTextPlugin('styles.[name].css'),
            // new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({ template: './src/index.html' }),
            new CopyWebpackPlugin([{
                from: './src/img',
                to: './img'
            }]),
            new webpack.HotModuleReplacementPlugin(),

            /**
             * Plugin LoaderOptionsPlugin (experimental)
             *
             * See: https://gist.github.com/sokra/27b24881210b56bbaff7
             */
            new webpack.LoaderOptionsPlugin({
                test: /\.css$/, // optionally pass test, include and exclude, default affects all loaders
                minimize: true,
                debug: false,
                options: {
                    // pass stuff to the loader
                }
            }),


            /*
             * Plugin: ScriptExtHtmlWebpackPlugin
             * Description: Enhances html-webpack-plugin functionality
             * with different deployment options for your scripts including:
             *
             * See: https://github.com/numical/script-ext-html-webpack-plugin
             */
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor'],
            })
        ],



        /*
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }


    });
    if (env.debug) {
        console.log(config)
        debugger // eslint-disable-line
    }
    return config

}