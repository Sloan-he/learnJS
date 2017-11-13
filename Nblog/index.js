/**
 * Created by Admin on 2017/11/13.
 */
const express = require('express')
const app = express()
const path = require('path')

//设置存放模板文件的目录
app.set('views',path.join(__dirname,'views'))
// 设置模板引擎为 ejs
app.set('view engine','ejs')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(80)