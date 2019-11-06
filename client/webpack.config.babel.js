import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
//import svginlineloader from "svg-inline-loader";
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

export default {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(png|jp(e*)g|gif|mp4)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 5000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
              test: /\.svg$/,
              loader: 'svg-inline-loader'
            },
            {
              test: /\.scss$/,
              use: [
                {
                  loader: "style-loader" // creates style nodes from JS strings
                },
                {
                  loader: "css-loader" // translates CSS into CommonJS
                },
                {
                  loader: "sass-loader" // compiles Sass to CSS
                }
              ]
            }
          ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            minify: true,
            template: path.join(__dirname, 'src/index.html')
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
        new MiniCssExtractPlugin({
          filename: "[hash].css",
          chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin([
            // { from: 'public', to: './' },
          ]),
        new CleanWebpackPlugin(),
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map',
    mode:"development",
      devServer: {
              contentBase: './build',
              inline: true,
              port: 3000
      }
};