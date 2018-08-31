const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');

module.exports = {
    entry: [
        // 为了支持模块热替换，注入代理客户端
        'webpack-hot-middleware/client',
        './main.js'
    ],
    output: {
        filename: 'bundle_browser.js',// 给输出的文件名称加上 hash 值
        path: path.resolve(__dirname, './dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.css/,// 增加对 CSS 文件的支持
                // 提取出 Chunk 中的 CSS 代码到单独的文件中
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader:'css-loader',
                            options:{
                                minimize:true
                            }
                        }
                    ] // 压缩 CSS 代码
                })
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024*30,
                            fallback:'file-loader'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: `[name].css`// 给输出的 CSS 文件名称加上 hash 值
        }),
        new DefinePlugin({
            // 定义 NODE_ENV 环境变量为 production 去除 react 代码中的开发时才需要的部分
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // 压缩输出的 JS 代码
        new UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 `console` 语句，可以兼容ie浏览器
               /* drop_console: true,*/
                // 内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true
            }
        })
    ]
};
