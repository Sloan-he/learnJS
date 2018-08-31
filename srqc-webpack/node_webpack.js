const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config.js')
const webpackMiddleware = require('webpack-dev-middleware')

// 实例化一个 Expressjs app
const app = express()
app.use(express.static('.'));

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(config)
// 给 app 注册 webpackMiddleware 中间件
app.use(webpackMiddleware(compiler,{
  // webpack-dev-middleware 所有支持的配置项
  // 只有 publicPath 属性为必填，其它都是选填项

  // Webpack 输出资源绑定在 HTTP 服务器上的根目录，
  // 和 Webpack 配置中的 publicPath 含义一致
  publicPath: '/dist/',
  index: 'index.html',
  // 不输出 info 类型的日志到控制台，只输出 warn 和 error 类型的日志
  noInfo: false,
}))
// 为了支持模块热替换，响应用于替换老模块的资源
app.use(require('webpack-hot-middleware')(compiler));
// 启动 HTTP 服务器，服务器监听在 3000 端口
app.listen(3000,() => console.info('成功监听在 3000'))
