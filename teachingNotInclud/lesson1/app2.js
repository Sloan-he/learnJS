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
                arr[i] = {id:i,name:'分类'+i}
            }
            cb(arr)
        },delay)
    },
    supp:function(params,cb){
        return new Promise(resolve =>{
            var delay = parseInt((Math.random() * 10000000) % 2000,10)
            setTimeout(function(){
                var random = Math.floor(Math.random()*5)
                var i = 0;
                var arr = []
                for(;i< random;i++){
                    arr[i] = {id:'supp'+params.id+i,suppName:'名称'+params.id+i,matId:params.id}
                }
                //cb(arr)
                resolve(arr)
            },delay)
        })
    },
    suppPro:function(params,cb){
        return new Promise(resolve =>{
            var delay = parseInt((Math.random() * 10000000) % 2000,10)
            setTimeout(function(){
                var random = Math.floor(Math.random()*3)
                var i = 0;
                var arr = []
                for(;i< random;i++){
                    arr[i] = {
                        id:'pro'+params.matId+i,
                        proName:'产品'+params.matId+i,
                        suppId:params.id,
                        suppName:params.suppName,
                        matId:params.matId
                    }
                }
                resolve(arr)
            },delay)
        })
    }
}


app.get('/list',function(req,res){
    api.list(req.query,function(list){
        var listFunArr = list.map((view,i) =>{
            return api.supp(view).then(supp =>{
                if(supp.length > 0){
                    return new Promise(resolve =>{
                        var arr = [];
                        (function next(i){
                            api.suppPro(supp[i]).then(res =>{
                                arr = arr.concat(res)
                                if(i !== supp.length-1){
                                    next(i+1)
                                }else{
                                    resolve(arr)
                                }
                            })
                        }(0))
                    })
                }
                return []
            })
        })
        Promise.all(listFunArr).then(rest => {
            res.send(rest)
        })
    })
})


app.listen(80,function(){
    //console.log('app is listening at port 3000');
})