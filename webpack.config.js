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
                test: /\.sass$/,
                use: extractPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                }),
                exclude: /node_modules/
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: htmlTemplatePath
        }),
        extractPlugin,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
};