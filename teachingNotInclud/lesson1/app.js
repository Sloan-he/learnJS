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
        var delay = parseInt((Math.random() * 10000000) % 2000,10)
        setTimeout(function(){
            var random = Math.floor(Math.random()*5)
            var i = 0;
            var arr = []
            for(;i< random;i++){
                arr[i] = {id:'supp'+params.id+i,suppName:'名称'+params.id+i,matId:params.id}
            }
            cb(arr)
        },delay)
    },
    suppPro:function(params,cb){
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
            cb(arr)
        },delay)
    }
}


app.get('/list',function(req,res){
    api.list(req.query,function(list){
        suppParallel(list,function(supplist){
            res.send(supplist)
        })
    })
})


function suppParallel(list,cb){
    var supplist = []
    var count = 0
    var len = list.length
    for(var i = 0;i<len;i++){
        (function(i){
            api.supp(list[i],function(supp){
                if(supp.length > 0){
                    var lens = supp.length;
                    var temp = [];
                    (function next(x){
                        api.suppPro(supp[x],function(pro){
                            temp = temp.concat(pro)
                            if(x === lens-1){
                                supplist[i] = temp
                                if(++count === len){
                                    cb(supplist)
                                }
                            }else{
                                next(x+1)
                            }
                        })
                    }(0))
                }else{
                    supplist[i] = []
                    if(++count === len){
                        cb(supplist)
                    }
                }
            })
        }(i))
    }
}


function proParallel(list,cb){
    var prolist = []
    var count = 0
    var len = list.length
    for(var i = 0;i<len;i++){
        (function(i){
            if(list[i].length != 0){
                var lens = list[i].length
                var counts = 0
                for(var j = 0;j<list[i].length;j++){
                    (function(j){
                        api.suppPro(list[i][j],function(supp){
                            prolist[i] ? prolist[i] = prolist[i].concat(supp) : prolist[i] = supp
                            console.log('prolist['+i+']',prolist[i],'supp is',supp)
                            if(++counts === lens){
                                if(++count === len){
                                    cb(prolist)
                                }
                            }
                        })
                    }(j))
                }
            }else{
                prolist[i] = []
                if(++count === len){
                    cb(prolist)
                }
            }
        }(i))
    }
}




function suppSerial(list,cb){
    var len = list.length;
    var supplist = [];
    var time = new Date().getTime();
    (function next(i){
        api.supp(list[i],function(supp){
            supplist[i] = supp
            if(i === len-1){
                console.log('串行时间:',new Date().getTime() - time)
                cb(supplist)
            }else{
                next(i+1)
            }
        })
    }(0))
}



app.listen(80,function(){
    //console.log('app is listening at port 3000');
})