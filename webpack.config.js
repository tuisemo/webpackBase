const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // entry: './main.js',
    entry: {
        'index': path.resolve(__dirname, './main.js'),
        'books': path.resolve(__dirname, './books.js'),
        'home': path.resolve(__dirname, './home.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
       // filename: './js/[name]-bundle-[hash].js'
        filename: './js/[name]-bundle.js'
    },
    module: {
        rules: [{
            test: /(\.js|\.jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }]
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            title: 'webpack',
            chunks: ['index'],
            template: './src/index.ejs',
            filename: './index.html',
        }),
        new HtmlWebpackPlugin({
            title: 'webpack',
            chunks: ['books'],
            template: './src/books.ejs',
            filename: './books.html',
        }),
        new HtmlWebpackPlugin({
            title: 'webpack',
            chunks: ['home'],
            template: './src/template.ejs',
            filename: './home.html',
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ]
}