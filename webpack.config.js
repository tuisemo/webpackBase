const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // entry: './main.js',
    entry: {
        'index': path.resolve(__dirname, './main.js'),
        'books': path.resolve(__dirname, './books.js'),
        'home2': path.resolve(__dirname, './home2.js'),
        'home3': path.resolve(__dirname, './home3.js'),
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
            chunks: ['home2'],
            template: './src/home2.ejs',
            filename: './home2.html',
        }),
        new HtmlWebpackPlugin({
            title: 'webpack',
            chunks: ['home3'],
            template: './src/home3.ejs',
            filename: './home3.html',
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ]
}