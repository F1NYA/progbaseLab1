let path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplatePath = path.resolve(__dirname, 'src/index.pug');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var extractPlugin = new ExtractTextPlugin({
    filename: 'index.css'
});

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.pug$/,
                loader: 'pug-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules/'),
                    path.resolve(__dirname, 'src/pages/')
                ]
            },
            {
                test: /.pug$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'pages/[name].html',
                        }
                    }, 'pug-html-loader'],
                include: path.resolve(__dirname, 'src/pages/'),
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'resources/',
                        publicPath: 'resources/'
                    }
                }]
            },
            {
                test: /\.sass$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                }),
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: htmlTemplatePath
        }),
        extractPlugin
    ],
};