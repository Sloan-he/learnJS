const http = require('http')
const formidable = require('formidable')


function show(res){
  var html = `<html>
    <head><title>Todo List</title></head>
    <body>

      <form action="/" method="post" enctype="multipart/form-data">
        <p><input type="text" name="name" /></p>
        <p><input type="file" name="file" /></p>
        <p><input type="submit" value="upload"></p>
      </form>
    </body>
  </html>`
  res.setHeader('Content-Type','text/html')
  res.setHeader('Content-Length',Buffer.byteLength(html))
  res.end(html)
}

function notFound(res){
  res.statusCode = 404
  res.setHeader('Content-Type','text/plain')
  res.end('Not Found')
}

function badRequest(res){
  res.statusCode = 400
  res.setHeader('Content-Type','text/plain')
  res.end('Not Found')
}



var server = http.createServer(function(req,res){
  if('/' == req.url){
    switch (req.method){
      case 'GET':
        show(res)
        break;
      case 'POST':
        upload(req,res)
        break;
      default : badRequest(res)
    }
  }else{
    notFound(res)
  }
}).listen(3000)


function upload(req,res){
  if(isFromData(req)){
    res.statusCode = 400
    res.end('Bad Request')
    return
  }
  let form = new formidable.IncomingForm()
  form.parse(req)
  form.on('field',function(field,value){
    console.log(field)
    console.log(value)
  })
  form.on('file',function(name,file){
    console.log(name)
    console.log(file)
  })
  form.on('end',function(){
    res.end('upload complete!')
  })
}

function isFromData(req){
  let type = req.headers['content-type'] || ''
  return 0 === type.indexOf('multipart/from-data')
}