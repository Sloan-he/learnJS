const fs = require('fs')
const path = require('path')
const args = process.argv.splice(2)
const command = args.shift()
const taskDescription = args.join(' ')
const file = path.join(process.cwd(),'./tasks/index.json')



switch (command){
  case 'list':
    listTask(file)
    break
  case 'add' :
    addTask(file,taskDescription)
    break
  default :
    console.log('Usage: '+ process.argv[0] + ' list|add [taskDescription]')
}

/*
* 检查文件夹是否存在
* */
function loadOrInitialzeTaskArray(file,cb){
  fs.stat(file,function(err,stat){
    let tasks = []
    if(err) {
      cb([])
    }else{
      fs.readFile(file,'utf8',function(err,data){
        if(err){
          console.log(err)
          throw err
        }
        let dataString = data.toString()
        tasks = JSON.parse(dataString || '[]')
        cb(tasks)
      })
    }
  })
}


function listTask(file){
  loadOrInitialzeTaskArray(file,function(tasks){
    for(let i in tasks){
      console.log(tasks[i])
    }
  })
}

function storeTasks(file,tasks){
  fs.writeFile(file,JSON.stringify(tasks),'utf8',function(err){
    if(err) throw err
    console.log('Saved.')
  })
}

function addTask(file,taskDescription){
  loadOrInitialzeTaskArray(file,function(tasks){
    tasks.push(taskDescription)
    storeTasks(file,tasks)
  })
}