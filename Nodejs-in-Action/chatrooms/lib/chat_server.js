const socktio = require('socket.io')


//初始化聊天状态的变量

let io
let guestNumber = 1
let nickNames = {}
let namesUsed = []
let currentRoom = {}


exports.listen = function(server){
  //启动socket服务器，允许它搭载在已有的HTTP服务器上
  io = socktio.listen(server)
  io.set('log level',1)

  //定义每个用户连接的处理逻辑
  io.sockets.on('connection',function(socket){
    //在用户连接上来时赋予其一个访客名
    guestNumber = assignGuestName(socket,guestNumber,nickNames,namesUsed)

    //用户连接上来时把他放入聊天室Lobby
    joinRoom(socket,'Lobby')

    //处理用户消息,更名,以及聊天室的创建和变更
    handleMessageBroadcasting(socket,nickNames)

    handleNameChangeAttempts(socket,nickNames,namesUsed)

    handleRoomJoining(socket)

    //用户请求时,向其提供已经被占用的聊天室的列表
    socket.on('rooms',function(){
      socket.emit('rooms',io.sockets.manager.rooms)
    })

    //定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket,nickNames,namesUsed)
  })
}

//分配用户昵称
function assignGuestName(socket,guestNumber,nickNames,namesUsed){
  let name = 'Guest' + guestNumber
  //用户昵称跟客户端连接ID关联上
  nickNames[socket.id] = name
  //让用户知道他们的昵称
  socket.emit('nameResult',{
    success:true,
    name:name
  })
  //存放已被占用昵称
  namesUsed.push(name)
  return guestNumber + 1
}

//进入聊天室相关的逻辑
function joinRoom(socket,room){
  socket.join(room)
  currentRoom[socket.id] = room
  //让用户知道他们进入的新房间
  socket.emit('joinResult',{room})
  //通知房间里的其他用户知道有新用户进入了房间
  socket.broadcast.to(room).emit('message',{
    text:`${nickName[socket.id]} has joined ${room}.`
  })
  //确定有哪些用户在这个房间里
  let usersInRoom = io.sockets.clients(room)
  //如果不止一个用户在这个房间里,汇总下都是谁
  if(usersInRoom.length > 1){
    let userInRoomSummary = `Users currently in ${room}:`
    for(let index in usersInRoom){
      let userSocketId = usersInRoom[index].id
      if(userSocketId != socket.id){
        if(index > 0){
          userInRoomSummary += ','
        }
        userInRoomSummary += nickNames[userSocketId]
      }
    }
    userInRoomSummary += '.'
    //汇总其他用户的信息给这个用户
    socket.emit('message',{
      text:userInRoomSummary
    })
  }
}
//更名请求处理
function handleNameChangeAttempts(socket,nickNames,namesUsed){
  socket.on('nameAttempt',function(name){
    if(name.indexOf('Guest') === 0){
      socket.emit('nameResult',{
        success:false,
        message:'Names cannot begin with Guest'
      })
    }else{
      if(namesUsed.indexOf(name) === -1){
        let previousName = nickNames[socket.id]
        let previousNameIndex = namesUsed.indexOf(previousName)
        //注册新昵称
        namesUsed.push(name)
        nickNames[socket.id] = name
        //删除之前的昵称,让其他用户可以使用
        delete namesUsed[previousNameIndex]
        socket.emit('nameResult',{
          success:true,
          name:name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message',{
          text:`${previousName} is now know as ${name}.`
        })
      }else{
        //发送昵称已被占用错误消息
        socket.emit('nameResult',{
          success:false,
          message:'That name is already in use.'
        })
      }
    }
  })
}

//发送消息
function handleMessageBroadcasting(socket){
  socket.on('message',function(message){
    socket.broadcast.to(message.room).emit('message',{
      text:`${nickNames[socket.id]}: ${message.text}`
    })
  })
}

//创建房间
function handleRoomJoining(socket){
  socket.on('join',function(room){
    socket.leave(currentRoom[socket.id])
    joinRoom(socket,room.newRoom)
  })
}

//用户断开连接
function handleClientDisconnection(socket){
  socket.on('disconnect',function(){
    let nameIndex = namesUsed.indexOf(nickNames[socket.id])
    delete namesUsed[nameIndex]
    delete nickNames[socket.id]
  })
}
