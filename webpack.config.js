let path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

var extractPlugin = new ExtractTextPlugin({
    filename: 'index.css'
});

/* FUNCTION TO GET PUGS */
var getPugsFromFolder = function (dir) {
    var filesystem = require("fs");
    var results = [];
    filesystem.readdirSync(dir).forEach(function (file) {
        file = dir + '/' + file;
        var stat = filesystem.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);
    });
    let filenames = [];
    results.map((item)=>{
        let reg = /[^/]*.pug/.exec(item)
        if(reg) filenames.push(reg[0].substring(0,reg[0].length - 4));
    });
    return filenames;
};

let config = {
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
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                    outputPath: 'fonts/',
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10000',
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
            template: path.resolve(__dirname, 'src/index.pug')
        }),
        extractPlugin
    ],
};

let pugs = getPugsFromFolder('src/pages');

pugs.map(pug => {
    config.plugins.push(new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, `src/pages/${pug}.pug`),
        filename: path.resolve(__dirname, `dist/pages/${pug}.html`)
    }))   
});

module.exports = config