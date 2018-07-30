/**
 * Created by Admin on 2018/7/29.
 */

function divEscapedContentElement(message){
  return $('<div></div>').text(message)
}

function divSystemContentElement(message){
  return $('<div></div>').html('<i>' + message + '</i>')
}

function processUserInput(chatApp,socket){
  console.log('processUserInput')
  var message = $('#send-message').val()
  var systemMessage;
  if(message.charAt(0) === '/'){
    systemMessage = chatApp.processCommand(message)
    console.log('systemMessage is',systemMessage)
    if(systemMessage){
      $('#messages').append(divSystemContentElement(systemMessage))
    }
  }else{
    console.log('send message before')
    chatApp.sendMessage($('#room').text(),message)
    console.log('send message after')
    $('#messages').append(divEscapedContentElement(message))
    $('#messages').scrollTop($('#messages').prop('scrollHeight'))
  }
  $('#send-message').val('')
}


var socket = io.connect()

$(function(){
  var chatApp = new Chat(socket);

  //显示更名尝试的结果
  socket.on('nameResult',function(result){
    var message
    if(result.success){
      message = 'You are now known as ' + result.name + '.'
    }else {
      message = result.message
    }

    $('#messages').append(divSystemContentElement(message))
  })
  //显示房间更变结果
  socket.on('joinResult',function(result){
    $('#room').text(result.room)
    $('#messages').append(divSystemContentElement('Room changed.'))
  })

  //显示接受到的信息
  socket.on('message',function(message){
    var newElement = $('<div></div>').text(message.text)
    $('#messages').append(newElement)
  })

  //显示可用房间列表
  socket.on('rooms',function(rooms){
    $('#room-list').empty();
    for(var room in rooms){
      room = room.substring(1,room.length)
      if(room != ''){
        $('#room-list').append(divEscapedContentElement(room))
      }
    }
    //点击房间名可以换到那个房间中
    $('#room-list div').click(function(){
      chatApp.processCommand('/join ' + $(this).text())
      $('#send-message').focus()
    })
  })

  setInterval(function(){
    socket.emit('rooms')
  },1000)

  $('#send-message').focus()

  $('#send-form').click(function(){
    processUserInput(chatApp,socket)
    return false
  })


})

