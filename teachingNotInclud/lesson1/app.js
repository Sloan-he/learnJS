/**
 * Created by Admin on 2017/10/18.
 */

var express = require('express');
var app = express()


app.get('/',function(req,res){
    res.send('Hello World');
})

app.listen(80,function(){
    console.log('app is listening at port 3000');
})