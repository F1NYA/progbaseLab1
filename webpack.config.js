let path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlTemplatePath = path.resolve(__dirname ,'src/index.pug');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var extractPlugin = new ExtractTextPlugin({
    filename: 'index.css'
});

module.exports = {
	entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
	},
	module: {
        loaders: [
            {
                test: /.pug$/,
                loader: 'pug-loader',
                exclude: /node_modules/,
			},
			{
                test: /\.sass$/,
                use: extractPlugin.extract({
                    use: ['css-loader','postcss-loader','sass-loader']
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