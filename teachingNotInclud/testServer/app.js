/**
 * Created by Admin on 2017/11/5.
 */
var express = require('express')
var fs = require('fs')
var session = require('express-session')
app = express()
app.use(express.static('./'));
app.use('/assets',express.static('images'));
app.use(session({
    secret: 'recommand 128 bytes random string',
    cookie: { maxAge: 3600 * 1000}
}))
console.log(process.env.NODE_ENV)
app.get('/user',function(req,res){
    if(req.query.user === '牛河' && req.query.pwd === 'niuhe'){
        req.session.root = true
        fs.readFile('girl.json',function(err,data){
            if(!err){
                res.status(200).send(data.toString())
                return
            }
        res.send('出错了！')
        })
    }else{
        res.send('账号或者密码错误！')
    }
})

app.get('/check',function(req,res){
    console.log(req.session)
    if(req.session.root){
        fs.readFile('girl.json',function(err,data){
            if(!err){
                res.status(200).send(data.toString())
                return
            }
            res.send('出错了！')
        })
    }else{
        res.send('请登录')
    }
})





app.listen(80)