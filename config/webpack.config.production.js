const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require("./webpack.config.base");

const GLOBALS = {
    "process.env": {
        NODE_ENV: JSON.stringify("production"),        
        API_URL: (process.env.NODE_ENV === "production") ? JSON.stringify("https://api.skuops.com") : JSON.stringify("https://stageapi.skuops.com")
    },
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "false")),
    PRODUCTION: JSON.stringify(true)
};

module.exports = merge(config, {
    devtool: false,
    entry: {
        application: ["production"]
        /* vendor: [
            "react",
            "react-dom",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux"
        ] */
    },
    optimization: {
        minimizer: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            }
          }),
        ],
        runtimeChunk: {
            name: 'single'
        },
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            //maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 10,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                name: 'vendor',
                //filename: 'js/[name].js',
                reuseExistingChunk: true
              },
              application: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }/* ,
              styles: {
                name: 'app',
                test: /\.css$/,
                chunks: 'all',
                enforce: true,
              } */
            }
          }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, "../src/client/assets/images"),
                to: "images"
            }
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            //chunkFilename: '[id].css',
          }),
        /*new CompressionPlugin({
            cache: 'js/cache'
        }),*/
        // Avoid publishing files when compilation fails
        //new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         screw_ie8: true
        //     },
        //     output: {
        //         comments: false
        //     },
        //     sourceMap: true
        // }),
       /*  new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }), */
        /*new BundleAnalyzerPlugin({
            analyzerPort: 3003,
            generateStatsFile: true
        })*/
    ],
    module: {
        // noParse: /\.min\.js$/,
        rules: [
           /*  {
                test: /\.json$/,
                loader: "json-loader"
            }, */
            /* // Sass
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, "../src/client/assets/javascripts"),
                    path.resolve(__dirname, "../src/client/assets/styles"),
                    path.resolve(__dirname, "../src/client/scripts")
                ],
                loaders: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        query: { outputStyle: "expanded" }
                    }
                ]
            }, */
            {
                test: /\.scss$/,
                loaders: [{
                    loader: MiniCssExtractPlugin.loader
                  },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: loader => [
                                require('postcss-import')(),
                                require('postcss-preset-env')(),
                                require('cssnano')({
                                    preset: ['default', {
                                        discardComments: {
                                            removeAll: true,
                                        },
                                    }]
                                })                         
                            ]
                         }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            // CSS
            /* {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader", "postcss-loader"]
            } */
            {
                test: /\.css$/,
                loaders: [{
                    loader: MiniCssExtractPlugin.loader
                  },"css-loader", 
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: loader => [
                                require('postcss-import')(),
                                require('postcss-preset-env')(),
                                require('cssnano')({
                                    preset: ['default', {
                                        discardComments: {
                                            removeAll: true,
                                        },
                                    }]
                                })                         
                            ]
                         }
                    }
                ]
            }
        ]
    }
});
