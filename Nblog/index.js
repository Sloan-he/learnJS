/**
 * Created by Admin on 2017/11/14.
 */
const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')


const app = express()

//设置模板引擎
app.set('views', path.join(__dirname, 'views'))
// 设置模板引擎为 ejs
app.set('view engine', 'ejs')
// 设置静态文件目录
app.use('/asset',express.static(path.join(__dirname, 'public')))

//session中间件
app.use(session({
  name:config.session.key, //设置cookie中保存session id 的字段名称
  secret:config.session.secret, //secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized:true,  //设置为false,强制创建一个session,即使用户未登录
  cookie:{
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store:new MongoStore({ // 将 session 存储到 mongodb
    url:config.mongodb // mongodb 地址
  })
}))

// flash 中间件，用来显示通知
app.use(flash())

//处理表单及文件上传
app.use(require('express-formidable')({
  uploadDir:path.join(__dirname,'public/img'), // 上传文件目录
  keepExtensions: true// 保留后缀
}))

//设置模板全局常量
app.locals.blog = {
  title:pkg.name,
  description: pkg.description
}

//添加模板必须的三个变量
app.use(function(req,res,next){
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  req.count = 1
  next()
})

//路由
routes(app)



app.use(function(err,req, res, next){
  console.error('23123213',err)
  if(err){
    req.flash('error', err.message)
    res.redirect('/signin');
  }
})

app.listen(config.port,function(){
  console.log(`${pkg.name} listening on port${config.port}`)
})
