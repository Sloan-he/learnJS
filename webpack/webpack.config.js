const path = require('path');
const webpack = require('webpack');
//生成全新的HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

//清理/dist文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry:{
        app:'./src/index.js'
    },
    devtool: 'inline-source-map',
    //开发服务器
    devServer:{
        contentBase: './dist',
        hot:true,
        host: 'localhost'
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:'Hot Module Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
    //module:{
    //    rules:[
    //        {
    //            test:/\.css$/,
    //            use:[
    //                'style-loader',
    //                'css-loader'
    //            ]
    //        },
    //        {
    //            test:/\.(png|svg|jpg|gif)$/,
    //            use:[
    //                'file-loader'
    //            ]
    //        },
    //        {
    //            test:/\.(woff|woff2|eot|ttf|otf)$/,
    //            use:[
    //                'file-loader'
    //            ]
    //        }
    //    ]
    //}
};