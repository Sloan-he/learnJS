const connect = require('connect')

const app = connect()
let router = ('./router')
let routes = {
  GET:{
    '/users':function(req,res){
      res.end('tobi,loki,ferret')
    },
    '/user/:id':function(req,res,id){
      res.end('user ' + id)
    }
  },
  DELETE:{
    '/user/:id':function(req,res,id){
      res.end('deleted user ' + id)
    }
  }
}

function loggerSetup(req,res,next){
  let regexp = /:(\w+)/g

  return function logger(req,res,next){
    let str = format.replace(regexp,function(match,property){
      return req[property]
    })
    console.log(str)
    next()
  }
}

function hello(req,res){
  res.setHeader('Content-Type','text/plain')
  res.end('hello world')
}

app.use(loggerSetup(':method :url'))

app.use(router( ))




app.listen(3000)