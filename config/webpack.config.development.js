const merge = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.base");
const path = require("path");
// const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const GLOBALS = {
    "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
        API_URL: (process.env.NODE_ENV === "production") ? JSON.stringify("https://api.skuops.com") : JSON.stringify("https://stageapi.skuops.com")
    },
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || "true"))
};

module.exports = merge(config, {
    devtool: "eval",
    mode: 'development',
    entry: {
        //application: path.resolve(__dirname, "../src/client/assets/javascripts/app/index.js")
          application: [
            "webpack-hot-middleware/client",
            "react-hot-loader/patch",
            "development"
        ],
       vendor: [
            "react",
            "react-dom",
            "react-redux",
            "react-router",
            "react-router-redux",
            "redux",
            // "jointjs"
        ]
    },
    optimization: {
        minimize: false,
        runtimeChunk: {
            name: 'single'
        },
        // mangleWasmImports: true,
        // removeAvailableModules: true,
        // removeEmptyChunks: true,
        // mergeDuplicateChunks: true,
        /* splitChunks: {
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
              }
            }
          } */
   },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false)
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            //chunkFilename: '[id].css',
        })
    ],
    module: {
        rules: [
            /* {
                test: /\.json$/,
                loader: "json-loader"
            }, */
            // Sass
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            reloadAll: true
                        }
                      },
                    "css-loader",
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            // Sass + CSS Modules
            // {
            //   test: /\.scss$/,
            //   include: /src\/client\/assets\/javascripts/,
            //   loaders: [
            //     'style',
            //     {
            //       loader: 'css',
            //       query: {
            //         modules: true,
            //         importLoaders: 1,
            //         localIdentName: '[path][name]__[local]--[hash:base64:5]'
            //       }
            //     },
            //     'postcss',
            //     { loader: 'sass', query: { outputStyle: 'expanded' } }
            //   ]
            // },
            // CSS
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "../src/client/assets"),
                    path.resolve(__dirname, "../node_modules/antd/lib"),
                    path.resolve(__dirname, "../node_modules/react-quill/dist"),
                    path.resolve(__dirname, "../node_modules/slick-carousel/slick"),
                    path.resolve(__dirname, "../node_modules/react-image-lightbox")                   
                ],
                loaders: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                        reloadAll: true
                    }
                  },"css-loader"
                ]
            }
        ]
    }
});
