const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry:'./main_server.js',
    target:'node',
    externals: [nodeExternals()],
    output:{
        libraryTarget:'commonjs2',
        filename: 'bundle_server.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'source-map',
    module:{
        rules:[
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                // CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件
                test: /\.css/,
                use: ['ignore-loader']
            }
        ]
    }
}