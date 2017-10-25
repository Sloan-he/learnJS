/**
 * Created by Admin on 2017/10/18.
 */

var express = require('express');
var app = express()
app.use(express.static('./'));

app.get('/',function(req,res){
    res.send('Hello World');
})

var api = {
    list:function(qs,cb){
        var delay = parseInt((Math.random() * 10000000) % 2000,10)
        setTimeout(function(){
            var i = 0
            var arr = []
            for(;i<qs.len;i++){
                arr[i] = i
            }
            cb(arr)
        },delay)
    },
    listSupp:function(qs,cb){
        var len = qs.length
        var count = 0
        var result = []
        for(var i = 0;i<len;i++){
            (function(i){
                var delay = parseInt((Math.random() * 10000000) % 2000,10)
                setTimeout(function(){
                    result[i] = [i+'0',i+'1',i+'2',i+'3']
                    if(++count === len){
                        cb([i+'0',i+'1',i+'2',i+'3'])
                    }
                },delay)
            }(i))
        }
    },
    listSuppSync:function(qs,cb){
        var len = qs.length,result = [];
        (function action(i){
            var delay = parseInt((Math.random() * 10000000) % 2000,10)
            setTimeout(function(){
                if(i === len){
                    cb(result)
                }else{
                    result[i] = [i+'0',i+'1',i+'2',i+'3']
                    action(i+1)
                }
            },delay)
        }(0))
    },
    suppPro:function(qs,cb){
        var delay = parseInt((Math.random() * 10000000) % 2000,10)
        setTimeout(function(){
            cb(['pro1','pro2'])
        },delay)
    }
}


app.get('/list',function(req,res){
    api.list(req.query,function(list){
        api.listSupp(list,function(supplist){

        })
    })
})

app.listen(80,function(){
    //console.log('app is listening at port 3000');
})