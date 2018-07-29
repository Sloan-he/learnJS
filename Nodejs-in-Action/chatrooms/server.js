/**
 * Created by Admin on 2018/7/29.
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const chatServer = require('./lib/chat_server')

let cache = {}


//数据及错误响应
function send404(res){
  res.writeHead(404,{'Content-type':'text/plain'})
  res.write('Error 404:resource not fount.')
  res.end()
}

function sendFile(res,filePath,fileContents){
  res.writeHead(200,{
    'Content-type':mime.lookup(path.basename(filePath))
  })
  res.end(fileContents)
}

//提供静态文件服务
function serverStatic(res,cache,absPath){
  //检查文件是否缓存在内存中
  if(cache[absPath]){
    sendFile(res,absPath,cache[absPath])
  }else{
    fs.stat(absPath,function(err){
      if(!err){
        //读取文件
        fs.readFile(absPath,function(err,data){
          if(err){
            send404(res)
          }else{
            //缓存文件
            cache[absPath] = data
            sendFile(res,absPath,data)
          }
        })
      }else {
        //发送404
        send404(res)
      }
    })
  }
}


const server = http.createServer(function(req,res){
  let filePath = false;
  if(req.url === '/'){
    filePath = 'public/index.html'
  }else{
    filePath = `public${req.url}`
  }
  let absPath = `./${filePath}`
  serverStatic(res,cache,absPath)
})
chatServer.listen(server)
server.listen(80,function(){
  console.log('Server listening on port 80.')
})