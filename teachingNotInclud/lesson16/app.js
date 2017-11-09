/**
 * Created by Admin on 2017/11/9.
 */

var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.listen(80);

app.use(cookieParser({httpOnly:true}));


app.get('/', function (req, res) {
    // 如果请求中的 cookie 存在 isVisit, 则输出 cookie
    // 否则，设置 cookie 字段 isVisit, 并设置过期时间为1分钟
    if (req.cookies.isVisit) {
        console.log(req.cookies);
        res.send("再次欢迎访问");
    } else {
        res.cookie('isVisit', 1);
        res.send("欢迎第一次访问");
    }
});