/**
 * Created by Admin on 2018/7/29.
 */
var Chat = function(socket){
  this.socket = socket
}

Chat.prototype.sendMessage = function(room,text){
  var message = {room,text}
  this.socket.emit('message',message)
}

Chat.prototype.changeRoom = function(room){
  this.socket.emit('join',{
    newRoom:room
  })
}
Chat.prototype.processCommand = function(command){
  console.log('command',command)
  var words = command.split(' ');
  console.log(words)
  var command = words[0].substring(1,words[0].length).toLowerCase()
  console.log('command2',command)
  var message = false

  switch (command){
    case 'join' :
      words.shift();
      var room = words.join(' ')
      this.changeRoom(room)
      break;
    case 'nick' :
      words.shift()
      var name = words.join(' ')
      console.log('name is',name)
      console.log(this.socket.emit)
      this.socket.emit('nameAttempt',name)
      break;
    default:
      message = 'Unrecognized command.'
      break
  }
  console.log(3333)
  return message;
}