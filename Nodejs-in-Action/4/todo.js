const http = require('http')
const url = require('url')
let items = []


const server = http.createServer(function(req,res){
  if(req.method === 'POST'){
    let item = ''
    req.setEncoding('utf8')
    req.on('data',function(chunk){
      console.log(chunk)
      item += chunk
    })
    req.on('end',function(){
      items.push(item)
      res.end('OK!')
    })
  }else if(req.method === 'GET'){
    let body = items.map(function(item,i){
      return (i + ')' + item + '\n')
    }).join('\n')
    res.setHeader('Content-Length',Buffer.byteLength(body))
    res.setHeader('Content-Type','text/plain; charset="utf-8"')
    res.end(body)
  }else if(req.method === 'DELETE'){
    const path = url.parse(req.url).pathname
    let i = parseInt(path.slice(1),10)

    if(isNaN(i)){
      res.statusCode = 400
      res.end('Invalid item id')
    }else if(!items[i]){
      res.statusCode = 400
      res.end('Item not found')
    }else{
      items.splice(i,1)
      res.end('OK!')
    }
  }
})

server.listen(80)