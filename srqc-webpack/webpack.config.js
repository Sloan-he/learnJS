const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const { AutoWebPlugin } = require('web-webpack-plugin');

const autoWebPlugin = new AutoWebPlugin('pages',{
  template: './template.html', // HTML 模版文件所在的文件路径
  postEntrys: ['./main.css'],// 所有页面都依赖这份通用的 CSS 样式文件
  commonsChunk: {
    name: 'common'// 提取出公共代码 Chunk 的名称
  },
})

module.exports = {
  // AutoWebPlugin 会为寻找到的所有单页应用，生成对应的入口配置，
  // autoWebPlugin.entry 方法可以获取到所有由 autoWebPlugin 生成的入口配置
  entry: autoWebPlugin.entry({
    // 这里可以加入你额外需要的 Chunk 入口
  }),
  output:{
    // 给输出的文件名称加上 Hash 值
    filename: '[name]_[chunkhash:8].js',
    // 把输出文件都放到 dist 目录下
    path:path.resolve(__dirname, './dist')
  },
  devtool:'source-map',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              cacheDirectory:true
            }
          }
        ],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        // 用正则去匹配要用该 loader 转换的 css 文件
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: [
            {
              loader:'css-loader',
              options:{
                minimize:true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    autoWebPlugin,
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: '[name]_[contenthash:8].css'
    }),
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production，以去除源码中只有开发时才需要的部分
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 压缩输出的 JavaScript 代码
    new UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句，可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        //collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    })
  ]
}