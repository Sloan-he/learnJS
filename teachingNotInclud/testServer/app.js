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
app.get('/user',function(req,res){
    if(req.query.user === '牛河' && req.query.pwd === 'niuhe'){
        req.session.root = true
        fs.readFile('girl.json',function(err,data){
            let list = JSON.parse(data).img
            req.session.pageCount = list.length
            let result
            if(req.query.pageNo > 1){
                result = list.splice((req.query.pageNo-1)*15,15)
            }else{
                result = list.splice(0,15)
            }
            if(!err){
                return res.status(200).send(JSON.stringify(result))

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
            let list = JSON.parse(data).img
            let result
            req.session.pageCount = list.length
            result = list.splice(0,15)
            if(!err){
                res.status(200).send(JSON.stringify(result))
                return
            }
            res.send('出错了！')
        })
    }else{
        res.send('请登录')
    }
})


app.get('/list',function(req,res,next){
    console.log('---------')
	if(req.query.num){
		res.send({data:req.query.num+10,retCode:'000000',msg:'add'})
	}else{
		res.send({data:0,retCode:'000000',msg:'add'})
	}
})





app.listen(3800,function(){
    console.log('run port 3800')
})