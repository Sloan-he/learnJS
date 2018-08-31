const net = require('net')

const server = net.createServer(function(socket){
  //多次响应
  socket.on('data',function(data){
    console.log(data)
    socket.write(data)
  })
  //响应一次
  /*socket.once('data',function(data){
    console.log(data)
    socket.write(data)
  })*/
})

server.listen(8888)