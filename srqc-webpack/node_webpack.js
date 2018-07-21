const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config.js')
const webpackMiddleware = require('webpack-dev-middleware')

// 实例化一个 Expressjs app
const app = express()

// 用读取到的 Webpack 配置实例化一个 Compiler
const compiler = webpack(config)
// 给 app 注册 webpackMiddleware 中间件
app.use(webpackMiddleware(compiler,{
  // webpack-dev-middleware 所有支持的配置项
  // 只有 publicPath 属性为必填，其它都是选填项

  // Webpack 输出资源绑定在 HTTP 服务器上的根目录，
  // 和 Webpack 配置中的 publicPath 含义一致
  publicPath: '/assets/',
  // 不输出 info 类型的日志到控制台，只输出 warn 和 error 类型的日志
  noInfo: false,
}))
// 启动 HTTP 服务器，服务器监听在 3000 端口
app.listen(3000);
