const fs = require('fs')
const request = require('request')
const htmlparser = require('htmlparser')
const configFilename = './rss_feeds.txt'

//判断RSS预定源URL列表的文件存在
function checkForRSSFile(){
  fs.stat(configFilename,function(err){
    if(err) return next(new Error('Miss RSS file:' + configFilename))
    next(null,configFilename)
  })
}

//解析RSS预定源文件
function readRSSFile(configFilename){
  fs.readFile(configFilename,function(err,feedList){
    if(err) return next(err)
    //转换成数组
    feedList = feedList.toString().replace(/^\s+|$/g,'').split('\n')
    //随机抽取一条
    let random = Math.floor(Math.random()*feedList.length)
    next(null,feedList[random])
  })
}

//请求数据
function downloadRSSFeed(feedUrl){
  request({uri:feedUrl},function(err,res,body){
    if(err) return next(err)
    if(res.statusCode != 200) return next(new Error('Abnormal response status code'))
    next(null,body)
  })
}

function parseRSSFeed(rss){
  const handler = new htmlparser.RssHandler()
  const parser = new htmlparser.Parser(handler)
  parser.parseComplete(rss)
  if(handler.dom.items.length) return next(new Error('No RSS items found'))
  const item = handler.dom.items.shift()
  console.log(item.title)
  console.log(item.link)
}

var tasks = [checkForRSSFile,readRSSFile,downloadRSSFeed,parseRSSFeed]

function next(err,result){
  if(err) throw err
  let currentTask = tasks.shift()
  if(currentTask) currentTask(result)
}

next()
