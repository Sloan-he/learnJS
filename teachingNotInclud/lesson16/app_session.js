/**
 * Created by Admin on 2017/11/9.
 */

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser')

var app = express();
app.listen(80);
app.use(express.static('./'));
app.use(bodyParser())

app.use(session({
    secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 3600 * 1000 }
}));

app.post('/login', function (req, res) {
    if(req.session.name) {
        req.session.isVisit++
        res.send('<p>第' + req.session.isVisit + '次来此页面,' + req.body.name + '</p>');
    } else {
        req.session.name = req.body.name;
        req.session.isVisit = 1
        res.send("欢迎第1次来这里" + req.body.name);
    }
});

