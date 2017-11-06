/**
 * Created by Admin on 2017/11/5.
 */
var express = require('express')
app = express()
var qs = require('qs')
app.use(express.static('./'));
app.use('/assets',express.static('images'));
var fs = require('fs')

app.get('/root',function(req,res){
    if(req.query.user === '桂林米粉' && req.query.pwd === 'guilinmifen'){
        fs.readFile('girl.json',function(err,data){
            if(!err){
                res.status(200).send({list:data.toString(),ip:'http://47.92.101.29'})
                return
            }
        res.status(500).send('出错了！')
        })
    }
})





app.listen(80)