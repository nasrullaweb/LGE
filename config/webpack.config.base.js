// Common Webpack configuration used by webpack.config.development and webpack.config.production

const path = require("path");
const webpack = require("webpack");
// const autoprefixer = require("autoprefixer");
module.exports = {
    mode: "development",
    entry: '../src/index.js',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "../build"),
        publicPath: "/",
        //chunkFilename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: ['/(node_modules|bower_components)/'],
                include: [path.resolve(__dirname, "./src")],
                loader: "babel-loader?cacheDirectory"
            },
            /* { // Shan: Commented since mostly it's required if we are using Any Browserify transforms
                test: /\.js$/,
                use: ["ify-loader"]
            }, */
            // JavaScript / ES6
            {
                test: /\.jsx?$/,
                include: path.resolve(
                    __dirname,
                    "../src"
                ),
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: ['css-loader'],
            }
        ]
    }
};
