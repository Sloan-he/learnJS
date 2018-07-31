const events = require('events')
const net  = require('net')

const channel = new events.EventEmitter()
channel.clients = {}
channel.subscriptions = {}


channel.on('join',function(id,client){
  this.clients[id] = client
  console.log('join id',id)
  this.subscriptions[id] = function(senderId,message){
    console.log('senderId',senderId)
    console.log('id is',id)
    if(id != senderId){
      this.clients[id].write(message)
    }
  }
  this.on('broadcast',this.subscriptions[id])
})

const server = net.createServer(function(client){
  let id = client.remoteAddress + ':' + client.remotePort
  channel.emit('join',id,client)
  client.on('data',function(data){
    data = data.toString()
    console.log('id',id)
    channel.emit('broadcast',id,data)
  })
})

server.listen(8888)