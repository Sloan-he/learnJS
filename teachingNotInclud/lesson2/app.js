/**
 * Created by Admin on 2017/10/18.
 */
var express = require('express');
var app = express();

app.get('/',function(req,res){
    var q = req.query.q
    res.send(q)
})


app.listen(80, function (req, res) {
    console.log('app is running at port 3000');
});