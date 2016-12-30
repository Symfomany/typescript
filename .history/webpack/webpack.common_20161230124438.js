const helpers = require('./helpers');
const webpack = require('webpack'); //to access built-in plugins

/**
 * Webpack plugins
 */
const webpackValidator = require('webpack-validator') // Validate a Webpack configuration
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
    title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass',
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
             * Plugin: HtmlElementsPlugin
             * Description: Generate html tags based on javascript maps.
             *
             * If a publicPath is set in the webpack output configuration, it will be automatically added to
             * href attributes, you can disable that by adding a "=href": false property.
             * You can also enable it to other attribute by settings "=attName": true.
             *
             * The configuration supplied is map between a location (key) and an element definition object (value)
             * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
             *
             * Example:
             *  Adding this plugin configuration
             *  new HtmlElementsPlugin({
             *    headTags: { ... }
             *  })
             *
             *  Means we can use it in the template like this:
             *  <%= webpackConfig.htmlElements.headTags %>
             *
             * Dependencies: HtmlWebpackPlugin
             */
            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
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
                names: ['main'],
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