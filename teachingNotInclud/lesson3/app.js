/**
 * Created by Admin on 2017/10/19.
 */

var express = require('express');
var app = express();
var superagent = require('superagent')
var cheerio = require('cheerio')
var iconv = require('iconv-lite')
require('superagent-charset')(superagent)

app.get('/',function(req,res){
    superagent.get('https://cnodejs.org').end(function(err,sres){
        if(err){
            return next(err)
        }
        var $ = cheerio.load(sres.text)
        var items = []
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            });
        });
        res.send(items);
    })
})


app.get('/caibab',function(req,res,next){
    superagent.get('http://www.cost168.com').charset('gbk').end(function(err,sres){
        if(err){
            return next(err)
        }
        console.log(iconv.decode(sres.text,'gbk'))
        var $ = cheerio.load(sres.text,{decodeEntities: false})
        res.write(sres.text)
    })
})




app.listen(80)
